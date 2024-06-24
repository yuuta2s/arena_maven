// const AbstractManager = require("./AbstractManager");

// class TournamentManager extends AbstractManager {
//   constructor() {
//     super({ table: "tournament" });
//   }

//   insert(tournament) {
//     return this.database.query(`insert into ${this.table} (name) values (?)`, [
//       tournament.id,
//       tournament.name,
//       tournament.date,
//       tournament.tournament_img,
//       tournament.organizer_id,
//       tournament.total_players,
//       tournament.short_description
      
//     ]);
//   }

//   update(tournament) {
//     return this.database.query(
//       `update ${this.table} set name = ? where id = ?`,
//       [tournament.username, tournament.id]
//     );
//   }
// }

// module.exports = TournamentManager;


const AbstractManager = require("./AbstractManager");

class TournamentManager extends AbstractManager {
  constructor() {
    super({ table: "tournament"});
  }

  insert(tournament) {
    return this.database.query(
      `INSERT INTO ${this.table} (name, date, tournament_img, organizer_id, total_players, short_description) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        tournament.name,
        tournament.date,
        tournament.tournament_img,
        tournament.organizer_id,
        tournament.total_players,
        tournament.short_description
      ]
    );
  }  

  update(tournament) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, date = ?, tournament_img = ?, organizer_id = ?, total_players = ?, short_description = ? WHERE id = ?`,
      [
        tournament.name,
        tournament.date,
        tournament.tournament_img,
        tournament.organizer_id,
        tournament.total_players,
        tournament.short_description,
        tournament.id
      ]
    );
  }

  getParticipantByTournamentId(id){
     return this.database.query(`SELECT u.id FROM tournament t INNER JOIN tournamentParticipation tp ON t.id = tp.tournament_id INNER JOIN user u ON u.id = tp.user_id WHERE t.id = ?
     `,[id]);}
}

module.exports = TournamentManager;
