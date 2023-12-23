const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class OpenMusicService {
    constructor() {
        this._pool = new Pool();
    }

    async addMusic({title, year, genre, performer, duration}) {
        const id = nanoid(16);
        
        const query = {
            text: "INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
            values: [id, title, year, genre, performer, duration],
        };
        
        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('lagu gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getMusics() {
        const result = await this._pool.query('SELECT id, title, performer FROM songs');
        return result.rows;
    }

    async getMusicById(id) {
        const query = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('lagu tidak ditemukan')
        }
    }

    async editMusicById(id , { title,  year, performer, genre, duration }) {
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5',
            values: [title, year, performer, genre, duration, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui lagu, Id tidak ditemukan');
        }
    }

    async deleteMusicById(id) {
        const query = {
            text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
            values: [id]
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new Error('Lagu gagal dihapus, id tidak ditemukan');
        }
    }
}

module.exports = OpenMusicService;