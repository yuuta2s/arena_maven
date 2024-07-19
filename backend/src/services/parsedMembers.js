
function parsedMembers(members) {
  let parsedMembers = members ? JSON.parse(members) : [];
  if (!Array.isArray(parsedMembers)) {
    parsedMembers = []; // Initialiser comme un tableau vide si ce n'est pas déjà un tableau
  }
  return parsedMembers;
}

module.exports = { parsedMembers };