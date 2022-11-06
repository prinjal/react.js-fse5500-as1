import { createTuit, deleteTuit, findAllTuits, findTuitById } from '../services/tuits-service';
import {
  createUser,
  deleteUser,
  deleteUsersByUsername, findAllUsers,
  findUserById
} from "../services/users-service";

describe('can create tuit with REST API', () => {
  // sample user to delete
  const sowell = {
    uniqueId: null,
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  let tuitSowell;
  let user;
  // setup the tests before verification
  // insert the sample user we then try to remove
  beforeAll(async () => {
    user = await createUser(sowell);
    sowell.uniqueId = user._id;
  });

  afterAll(async () => {
    await deleteTuit(tuitSowell._id);
    await deleteUser(sowell.uniqueId);
  });

  test('Testing creation of tuit', async () => {
    tuitSowell = {
      tuit: 'Test Tuit',
    }
    const newTuit = await createTuit(sowell.uniqueId, tuitSowell);
    expect(newTuit.postedBy).toEqual(sowell.uniqueId);
    expect(newTuit.tuit).toEqual(tuitSowell.tuit);
    tuitSowell._id = newTuit._id;
  });



});

describe('can delete tuit wtih REST API', () => {

  const sowell = {
    uniqueId: null,
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  let user;
  let tuitSowell;
  let newTuit;

  beforeAll(async () => {
    user = await createUser(sowell);
    sowell.uniqueId = user._id;
    tuitSowell = {
      tuit: 'Test Tuit',
    }
    newTuit = await createTuit(sowell.uniqueId, tuitSowell);
    tuitSowell._id = newTuit._id;
  });

  afterAll(async () => {
    await deleteUser(sowell.uniqueId);
  });

  test('Testing deletion of tuit', async () => {

    const tuitDelete = await deleteTuit(tuitSowell._id);
    expect(tuitDelete.deletedCount).toBeGreaterThanOrEqual(1);

  })

});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const sowell = {
    uniqueId: null,
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  let user;
  let tuitSowell;
  let newTuit;

  beforeAll(async () => {
    user = await createUser(sowell);
    sowell.uniqueId = user._id;
    tuitSowell = {
      tuit: `Unique Test String ${user._id}`,
    }
    newTuit = await createTuit(sowell.uniqueId, tuitSowell);
    tuitSowell._id = newTuit._id;
  });

  afterAll(async () => {
    await deleteTuit(newTuit._id);
    await deleteUser(sowell.uniqueId);
  });

  test('Testing finding specific tuit', async () => {

    const findTuit = await findTuitById(tuitSowell._id);
    expect(findTuit.tuit).toEqual(`Unique Test String ${user._id}`);

  });
});

describe('can retrieve all tuits with REST API', () => {

  const sowell = {
    uniqueId: null,
    username: 'thommas_sowell',
    password: 'compromise',
    email: 'compromise@solutions.com'
  };

  const mapTuitString = ['Tuit1', 'Tuit2', 'Tuit3'];
  const mapTuitId = [];

  let user;
  let tuitSowell;
  let newTuit;

  beforeAll(async () => {

    user = await createUser(sowell);
    sowell.uniqueId = user._id;

    mapTuitString.map(async tuit => {
      await createTuit(sowell.uniqueId, `${tuit} + ${sowell.uniqueId}`);
    })
  });

  afterAll(async () => {
    await mapTuitId.forEach(tuit => {
      deleteTuit(tuit);
    });
    await deleteUser(sowell.uniqueId);
  });

  test('Testing finding all the tuits', async () => {

    const findTuit = await findAllTuits();

    const tuitsWeInserted = findTuit.filter(
      tuit => mapTuitString.indexOf(tuit.tuit) >= 0);

    tuitsWeInserted.forEach(tuit => {
      const tuitName = mapTuitString.find(tuitName => tuitName === tuit.tuit);
      expect(tuit.tuit).toEqual(tuitName);
      mapTuitId.push(tuitsWeInserted._id);
    });



  });



});