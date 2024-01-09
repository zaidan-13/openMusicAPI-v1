/* eslint-disable no-unused-vars */

class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postMusicHandler = this.postMusicHandler.bind(this);
        this.getMusicsHandler = this.getMusicsHandler.bind(this);
        this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
        this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this);
        this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);

    }

    async postMusicHandler(request, h) {
            this._validator.validateSongPayload(request.payload);
            const { title, year, genre, performer, duration, albumId } = request.payload;

            const songId = await this._service.addSong({title, year, genre, performer, duration, albumId});

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil ditambahkan',
                data: {
                    songId,
                }
            })
            response.code(201);
            return response;
    }

    async getMusicsHandler(request) {
        const params = request.query;
        const songs = await this._service.getSongs(params);
        return {
        status: 'success',
        data: {
            songs: songs.map(song => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
            }), ),
        },
        };
    }

    async getMusicByIdHandler(request, h) {
            const { id } = request.params;
            const song = await this._service.getSongById(id);
            return {
                status: 'success',
                data: {
                    song,
                },
            };
    }

    async putMusicByIdHandler(request, h) {
            this._validator.validateSongPayload(request.payload);
            const { id } = request.params;

            await this._service.editSongById(id, request.payload);

            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui',
            };
    }

    async deleteMusicByIdHandler(request, h) {
            const { id } = request.params;
            await this._service.deleteSongById(id);
    
            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
    }
}

module.exports = SongsHandler;