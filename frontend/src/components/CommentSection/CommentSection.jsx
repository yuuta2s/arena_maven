import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useParams } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

function CommentSection({ tournament}) {
  const { id }= useParams();
  console.log("tournament id:", tournament.id);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  console.log(comments);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/by-tournament/${tournament.id}`)
      .then((response) => {
        const lastThreeComments = response.data.slice(-3);
        console.log("Fetched comments:", lastThreeComments); // Check fetched comments
        setComments(lastThreeComments);
        localStorage.setItem(`comments-${id}`, JSON.stringify(lastThreeComments));
      })
      .catch((error) => {
        console.error("Error loading comments:", error);
        const savedComments = localStorage.getItem(`comments-${id}`);
        if (savedComments) {
          console.log("Loaded comments from localStorage:", JSON.parse(savedComments));
          setComments(JSON.parse(savedComments));
        }
      });
  }, [id]);
  
  
   
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUserInfo = () => {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken; // { id, username, email, role }
    }
    return null;
  };

  const updateLocalStorage = (comments) => {
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  };

  const handleAddComment = () => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.error("User not logged in");
      return;
    }

    const commentData = {
      content: newComment,
      user_id: userInfo.sub.id,
      tournament_id: tournament.id,
    };

    axios
      .post("http://localhost:5000/comments", commentData)
      .then((response) => {
        console.log("Response from server after adding comment:", response.data);
        if (response.status === 201) {
          const newComments = [
            ...comments,
            {
              ...commentData,
              username: userInfo.sub.username,
              created_at: new Date().toISOString(),
              id: response.data.id, // Ensure ID is correctly set here
            },
          ];
          setComments(newComments);
          updateLocalStorage(newComments);
          setNewComment("");
        } else {
          console.error("Failed to add comment:", response);
        }
      })
      .catch((error) => console.error("Failed to add comment:", error));
  };

  const handleEditComment = (commentId) => {
    console.log("Editing comment with ID:", commentId);
    setEditingComment(commentId);
    const comment = comments.find((comment) => comment.id === commentId);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = (commentId) => {
    console.log("Updating comment with ID:", commentId);
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.error("User not logged in");
      return;
    }

    axios
      .put(`http://localhost:5000/comments/${commentId}`, {
        content: editedContent,
        user_id: userInfo.sub.id,
        tournament_id: tournament.id,
      })
      .then(() => {
        const updatedComments = comments.map((comment) =>
          comment.id === commentId ? { ...comment, content: editedContent } : comment
        );
        setComments(updatedComments);
        updateLocalStorage(updatedComments);
        setEditingComment(null);
        setEditedContent("");
      })
      .catch((error) => console.error("Failed to update comment:", error));
  };

  const handleDeleteComment = (commentId) => {
    console.log("Deleting comment with ID:", commentId);
    axios
      .delete(`http://localhost:5000/comments/${commentId}`)
      .then(() => {
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
        updateLocalStorage(updatedComments);
      })
      .catch((error) => console.error("Failed to delete comment:", error));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const getUserName = (id) => {
    const user = users.find((user) => user.id === parseInt(id, 10));
    return user ? user.username : "Unknown User";
  };

  return (
    <div className="w-full mt-4">
      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
          <p className="text-lg font-bold">{getUserName(comment.user_id)}</p>
          <p className="text-sm">{formatDate(comment.created_at)}</p>
          {editingComment === comment.id ? (
            <div className="flex flex-col">
              <textarea
                className="w-full p-2 text-base border border-gray-300 rounded-md"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <button
                className="mt-2 bg-warning hover:bg-vertBG text-white font-bold py-2 px-4 rounded"
                onClick={() => handleUpdateComment(comment.id)}
              >
                Modifier votre commentaire
              </button>
            </div>
          ) : (
            <p className="text-sm">{comment.content}</p>
          )}
          <div className="flex space-x-2 mt-2 justify-end">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => handleEditComment(comment.id)}
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <textarea
          className="w-full p-2 text-base border border-gray-300 rounded-md"
          placeholder="Ajoutez un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded"
          onClick={handleAddComment}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
