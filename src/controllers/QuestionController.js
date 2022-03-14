const Database = require('../database/config');

module.exports = {
  index(req, res) {
    return res.render('index', { page: 'enter-room' });
  },
  async post(req, res) {
    try {
      const db = await Database();
      // Deletar ou marcar como lida
      const { id: roomId, question: questionId, action } = req.params;
      const { password } = req.body;

      const room = await db.get(
        `SELECT * FROM rooms WHERE id = ${roomId}`
      );

      if(room.password == password) {
        if(action == "delete"){

          await db.run(`DELETE FROM questions WHERE id = ${questionId}`);

        }else if (action == "check"){

          await db.run(`
          UPDATE questions SET 
          read = 1
          WHERE id = ${questionId}`)
        }
        res.redirect(`/room/${roomId}`);
      }else{
        res.render('error-message', { 
          error: 'Senha incorreta! Por favor tente novamente!',
          src: `/room/${roomId}`
        })
      }

    } catch (error) {
      console.error(error);
    }
  },
  async create(req, res) {
    try {
      const db = await Database();

      const { question } = req.body;
      const roomId = req.params.id;

      const query = `INSERT INTO questions (
        content,
        roomId,
        read
    ) VALUES (?,?,?)`;

      const values = [question, roomId, 0];

      await db.run(query, values);

      res.redirect(`/room/${roomId}`);
    } catch (error) {
      console.error(error);
    }
  }
};
