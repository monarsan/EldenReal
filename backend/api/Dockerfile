FROM python:3.10

WORKDIR /usr/app
COPY requirements.txt .
RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]
