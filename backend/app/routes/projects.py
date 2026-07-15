from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.project import Project
from app.models.survey import Survey

from app.schemas.project import ProjectCreate, ProjectResponse
from app.schemas.survey import SurveyCreate, SurveyResponse

from app.models.question import Question
from app.schemas.question import QuestionCreate, QuestionResponse

from app.models.option import Option
from app.schemas.option import (
    OptionCreate,
    OptionResponse
)

from app.models.response import Response
from app.schemas.response import ResponseCreate

from sqlalchemy import func
from app.models.response import Response
from app.models.option import Option

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.get("/", response_model=list[ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@router.post("/", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    db_project = Project(
        name=project.name,
        description=project.description,
        status=project.status
    )

    db.add(db_project)
    db.commit()
    db.refresh(db_project)

    return db_project

@router.post("/surveys", response_model=SurveyResponse)
def create_survey(
    survey: SurveyCreate,
    db: Session = Depends(get_db)
):
    db_survey = Survey(
        name=survey.name,
        status=survey.status
    )

    db.add(db_survey)
    db.commit()
    db.refresh(db_survey)

    return db_survey

@router.get("/count")
def get_projects_count(db: Session = Depends(get_db)):
    count = db.query(Project).count()
    return {"count": count}

@router.get("/surveys/count")
def get_surveys_count(db: Session = Depends(get_db)):
    count = db.query(Survey).count()
    return {"count": count}

@router.get("/questions/count")
def get_questions_count(
    db: Session = Depends(get_db)
):
    count = db.query(Question).count()

    return {
        "count": count
    }


@router.get("/responses/count")
def get_responses_count(
    db: Session = Depends(get_db)
):
    count = db.query(Response).count()

    return {
        "count": count
    }


@router.get("/surveys", response_model=list[SurveyResponse])
def get_surveys(db: Session = Depends(get_db)):
    return db.query(Survey).all()    

@router.post(
    "/questions",
    response_model=QuestionResponse
)
def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db)
):
    db_question = Question(
        survey_id=question.survey_id,
        text=question.text
    )

    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    return db_question

@router.post(
    "/options",
    response_model=OptionResponse
)
def create_option(
    option: OptionCreate,
    db: Session = Depends(get_db)
):
    db_option = Option(
        question_id=option.question_id,
        text=option.text
    )

    db.add(db_option)
    db.commit()
    db.refresh(db_option)

    return db_option

@router.post("/responses")
def create_response(
    response: ResponseCreate,
    db: Session = Depends(get_db)
):
    db_response = Response(
        question_id=response.question_id,
        option_id=response.option_id
    )

    db.add(db_response)
    db.commit()
    db.refresh(db_response)

    return db_response

@router.get("/statistics/{question_id}")
def get_statistics(
    question_id: int,
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Option.text,
            func.count(Response.id)
        )
        .outerjoin(
            Response,
            Response.option_id == Option.id
        )
        .filter(
            Option.question_id == question_id
        )
        .group_by(Option.text)
        .all()
    )

    return [
        {
            "option": option,
            "count": count
        }
        for option, count in results
    ]

@router.get(
    "/options/{question_id}",
    response_model=list[OptionResponse]
)
def get_options(
    question_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Option).filter(
        Option.question_id == question_id
    ).all()

@router.get(
    "/questions/{survey_id}",
    response_model=list[QuestionResponse]
)
def get_questions(
    survey_id: int,
    db: Session = Depends(get_db)
):
    return db.query(Question).filter(
        Question.survey_id == survey_id
    ).all()

@router.put("/surveys/{survey_id}", response_model=SurveyResponse)
def update_survey(
    survey_id: int,
    survey: SurveyCreate,
    db: Session = Depends(get_db)
):
    db_survey = db.query(Survey).filter(Survey.id == survey_id).first()

    if not db_survey:
        raise HTTPException(status_code=404, detail="Survey not found")

    db_survey.name = survey.name
    db_survey.status = survey.status

    db.commit()
    db.refresh(db_survey)

    return db_survey

@router.delete("/surveys/{survey_id}")
def delete_survey(
    survey_id: int,
    db: Session = Depends(get_db)
):
    db_survey = db.query(Survey).filter(
        Survey.id == survey_id
    ).first()

    if not db_survey:
        raise HTTPException(
            status_code=404,
            detail="Survey not found"
        )

    questions = db.query(Question).filter(
        Question.survey_id == survey_id
    ).all()

    for question in questions:
        db.delete(question)

    db.delete(db_survey)
    db.commit()

    return {
        "message": "Survey deleted successfully"
    }


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.delete(project)
    db.commit()

    return {
        "message": "Project deleted successfully"
    }

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    db_project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not db_project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db_project.name = project.name
    db_project.description = project.description
    db_project.status = project.status

    db.commit()
    db.refresh(db_project)

    return db_project

