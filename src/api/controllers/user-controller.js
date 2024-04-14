import bcrypt from 'bcrypt';
import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from "../models/user-model.js";

// TESTED
const getUser = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TESTED
const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TESTED
const postUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await addUser(req.body);
    res.json({message: 'New user added.', result});
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TESTED
const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.body, req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error modifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// TESTED
const deleteUser = async (req, res) => {
  try {
    const result = await removeUser(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
