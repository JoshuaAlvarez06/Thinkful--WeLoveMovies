const knex = require("../db/connection");

function list() {
    return knex("movies")
        .select("*");
}

function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({"mt.is_showing": true})
        .orderBy("m.movie_id")
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movieId })
        .first();
}

function readTheaters(movieId) {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .distinct("t.*")
        .where({ "m.movie_id": movieId })
}

module.exports = {
    list,
    listShowing,
    read,
    readTheaters,
};