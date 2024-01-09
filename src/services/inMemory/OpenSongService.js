const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class OpenSongService {
    constructor() {
        this._music = [];
        this._album = [];
    }

    addMusic({ title,  year, genre, performer, duration}) {
        const id = nanoid(16);

        const newMusic = {
            id, title,  year, genre, performer, duration
        };

        this._music.push(newMusic);

        const isSuccess = this._music.filter((song) => song.id === id).length > 0;

        if (!isSuccess) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return id;
    }

    addAlbum({name, year}) {
        const id = nanoid(16);

        const newAlbum = {
            id , name, year
        };

        this._album.push(newAlbum);

        const isSucess = this._album.filter((album) => album.id === id).length > 0;

        if (!isSucess) {
            throw new InvariantError('Album gagal ditambahkan');
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

    getAlbumById(id) {
        const album = this._album.filter((a) => a.id === id)[0];

        if (!album) {
            throw new NotFoundError('Album tidak ditemukan');
        }
        return album;
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

    editAlbumById(id, { name, year }) {
        const indexAlbum = this._album.findIndex((album) => album.id === id);

        if (indexAlbum === -1 ) {
            throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        this._album[indexAlbum] = {
            ...this._album[indexAlbum],
            name, year
        };
    }

    deleteMusicById(id) {
        const index = this._music.findIndex((song) => song.id === id);

        if (index === -1) {
            throw new NotFoundError('Catatan gagal dihapus. id tidak ditemukan');
        }

        this._music.splice(index, 1);
    }

    deleteAlbumById(id) {
        const indexAlbum = this._album.findIndex((album) => album.id === id);

        if (indexAlbum === -1) {
            throw new NotFoundError('Lagu gagal dihapus. id tidak ditemukan');
        }

        this._album.splice(indexAlbum, 1);
    }
}


module.exports = OpenSongService;
