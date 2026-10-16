import pytest
from app import app


@pytest.fixture()
def client():
    app.config["TESTING"] = True
    with app.test_client() as test_client:
        yield test_client


def test_movies_endpoint_returns_movie_list(client):
    response = client.get("/movies")
    assert response.status_code == 200
    movies = response.get_json()
    assert isinstance(movies, list)
    assert len(movies) > 0
    assert all("id" in movie and "title" in movie for movie in movies)


def test_health_endpoint(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}
