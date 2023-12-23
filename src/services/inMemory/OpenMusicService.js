const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
    constructor() {
        this._music = [];
    }

    addMusic({ title,  year, genre, performer, duration}) {
        const id = nanoid(16);

        const newMusic = {
            title,  year, genre, performer, duration
        };

        this._music.push(newMusic);

        const isSuccess = this._music.filter((song) => song.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return id;
    }

    getMusics() {
        return this._music;
    }

    getMusicById(id) {
        const song = this._music.filter((n) => n.id === id)[0];

        if (!song) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }
        return song;
    }

    editMusicById(id, { title,  year, genre, performer, duration }) {
        const index = this._music.findIndex((song) => song.id === id);

        if (index === -1) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        this._music[index] = {
            ...this._music[index],
            title,  year, genre, performer, duration
        };
    }

    deleteMusicById(id) {
        const index = this._music.findIndex((song) => song.id === id);

        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. id tidak ditemukan');
        }

        this._music.splice(index, 1);
    }
}

module.exports = NotesService;
