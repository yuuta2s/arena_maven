// Import the AbstractManager module
const AbstractManager = require("./AbstractManager");

// Declare the TournamentParticipationManager class that inherits from AbstractManager
class TournamentParticipationManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class with the table name
    super({ table: "tournamentParticipation" });
  }

  // Method to insert a new participation in the tournament
  async insert(tournamentParticipation) {
    try {
      // Execute the SQL query to insert a record into the table
      const result = await this.database.query(
        `INSERT INTO ${this.table} (user_id, tournament_id) VALUES (?, ?)`,
        [tournamentParticipation.user_id, tournamentParticipation.tournament_id]
      );
      return result.insertId; // Return the ID of the inserted record
    } catch (error) {
      throw new Error(`Error inserting tournament participation: ${error.message}`);
    }
  }

  // Method to update an existing tournament participation
  async update(tournamentParticipation) {
    try {
      // Execute the SQL query to update a record in the table
      const result = await this.database.query(
        `UPDATE ${this.table} SET user_id = ?, tournament_id = ? WHERE id = ?`,
        [tournamentParticipation.user_id, tournamentParticipation.tournament_id, tournamentParticipation.id]
      );
      return result.affectedRows > 0; // Return true if the update was successful
    } catch (error) {
      throw new Error(`Error updating tournament participation: ${error.message}`);
    }
  }

  // Method to fetch tournament participations including usernames
  async fetchTournamentParticipations() {
    try {
      // Execute the SQL query to fetch tournament participations
      const query = `
        SELECT tp.*, u.username 
        FROM ${this.table} tp
        JOIN users u ON tp.user_id = u.id
      `;
      const participations = await this.database.query(query);
      return participations; // Return the fetched participations with usernames
    } catch (error) {
      throw new Error(`Error fetching tournament participations: ${error.message}`);
    }
  }
}

// Export the TournamentParticipationManager class for use in other modules
module.exports = TournamentParticipationManager;
