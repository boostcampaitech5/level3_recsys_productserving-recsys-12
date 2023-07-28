FROM python:3.10.0

RUN mkdir /workspace
COPY . /workspace
WORKDIR /workspace

RUN pip install fastapi uvicorn[standard] --no-cache-dir 
RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]