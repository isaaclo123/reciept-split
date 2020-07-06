FROM python:3.8

RUN pip install pipenv

WORKDIR /srv/receipt-split
COPY ./migrations/ ./migrations/
COPY ./receipt_split/ ./receipt_split/
COPY ./app.py .
COPY ./config.py .
COPY ./Pipfile .
COPY ./Pipfile.lock .

# Start Args

ENV SECRET_KEY="999_DEBUG_CHANGE_IN_PROD_999"
ENV DB_URI="sqlite:///app.db.sqlite3"

ENV FLASK_APP=app.py
ENV WSGI_WORKERS=2

ENV DEBUG=False

# End Args


RUN pipenv install

RUN pipenv run flask db stamp head
RUN pipenv run flask db migrate
RUN pipenv run flask db upgrade

CMD [ "pipenv", "run", "gunicorn", "-w", "$WSGI_WORKERS", "-b", ":5000", "receipt_split:create_app()" ]
