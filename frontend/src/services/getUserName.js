

const getUserName = (id,users) => {
    const user = users.find((user) => user.id === parseInt(id, 10));
    return user ? user.username : "Unknown User";
  };

  export default getUserName;