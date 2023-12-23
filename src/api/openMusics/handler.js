/* eslint-disable no-unused-vars */

class MusicsHandler {
    constructor(service) {
        this._service = service;

        this.postMusicHandler = this.postMusicHandler.bind(this);
        this.getMusicsHandler = this.getMusicsHandler.bind(this);
        this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
        this.putMusicByIdHandler = this.putMusicByIdHandler.bind(this);
        this.deleteMusicByIdHandler = this.deleteMusicByIdHandler.bind(this);
    }

    async postMusicHandler(request, h) {
            const { title, year, genre, performer, duration } = request.payload;

            const songId = await this._service.addMusic({title, year, genre, performer, duration});

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

    async getMusicsHandler() {
        const songs = await this._service.getMusics();
        return {
            status: 'success',
            data: {
                songs,
            },
        };
    }

    async getMusicByIdHandler(request, h) {
            const { id } = request.params;
            const song = await this._service.getMusicById(id);
            return {
                status: 'success',
                data: {
                    song,
                },
            };
    }

    async putMusicByIdHandler(request, h) {
            const { id } = request.params;

            await this._service.editMusicById(id, request.payload);

            return {
                status: 'success',
                message: 'Lagu berhasil diperbarui',
            };
    }

    async deleteMusicByIdHandler(request, h) {
            const { id } = request.params;
            await this._service.deleteMusicById(id);
    
            return {
                status: 'success',
                message: 'Lagu berhasil dihapus',
            };
    }
}

module.exports = MusicsHandler;