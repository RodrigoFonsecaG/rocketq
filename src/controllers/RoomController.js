const Database = require('../database/config');

module.exports = {
  createForm(req, res) {
    return res.render('index', { page: 'create-password' });
  },
  async create(req, res) {
    try {
      const db = await Database();

      let isRoom = true;
      let roomId;

      const { password } = req.body;

      while (isRoom) {
        // Gera numero da sala
        roomId = Math.floor(100000 + Math.random() * 900000); // Numero de 6 digitos

        // Verificar se esse numero ja existe
        const roomsExistIds = await db.all(`SELECT id FROM rooms`);

        isRoom = roomsExistIds.some((roomExistId) => roomExistId.id === roomId);

        if (!isRoom) {
          // Insere sala no banco
          await db.run(
            `INSERT INTO rooms(
                  id,
                  password
              ) VALUES (${roomId}, ${password})
              `
          );
        }
      }

      await db.close();

      return res.redirect(`/room/${roomId}`);
    } catch (error) {
      console.error(error);
    }
  },
  async open(req, res) {
    const db = await Database();
    const { id } = req.params;

    const roomExist = await db.get(`SELECT * FROM rooms WHERE id = ${id}`);
    
    if(!roomExist){
      return res.render('error-message.ejs', {
        error: 'Essa sala não existe, favor criar uma nova sala ou entrar em uma já existente',
        src: '/'
      })
    }
    

    const questions = await db.all(`SELECT * FROM questions WHERE roomId = ${id} AND read = 0 
    ORDER BY id DESC`);
    
    const questionsRead = await db.all(`SELECT * FROM questions WHERE roomId = ${id} AND read = 1`);



    return res.render('room', { id, questions, questionsRead });
  },
  enter(req, res){
    const {roomId} = req.body;


    res.redirect(`/room/${roomId}`);
  }
};
