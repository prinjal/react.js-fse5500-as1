import { createTuit, deleteTuit, findTuitById } from '../services/tuits-service';
import { screen, render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { findAllTuits } from "../services/tuits-service";
import axios from "axios";
import { UserList } from "../components/profile/user-list.js";
import {
  createUser,
  deleteUsersByUsername
} from "../services/users-service";
import Tuits from "../components/tuits/index.js";

//jest.mock('axios');

// const MOCKED_USERS = [
//   "alice", "bob", "charlie"
// ];

const MOCKED_USERS = [
  { username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123" },
  { username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234" },
]

const MOCKED_TUITS = [
  { tuit: "ellen's tuit", postedBy: "123" },
  { tuit: "sarah's tuit", postedBy: "234" }
];

// "alice's tuit", "bob's tuit", "charlie's tuit"

test('tuit list renders static tuit array', () => {

  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS} />
    </HashRouter>);
  const linkElement = screen.getByText(/ellen's tuit/i);
  expect(linkElement).toBeInTheDocument();
});


describe('user list renders async', () => {
  const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
  };

  let tuitSowell;
  // setup test before running test
  beforeAll(async () => {
    tuitSowell = {
      tuit: "ellenripley's Tuit",
    }
    // remove any/all users to make sure we create it in the test
    return await deleteUsersByUsername(ripley.username);
  });

  // clean up after test runs
  afterAll(async () => {
    await deleteTuit(tuitSowell._id);
    // remove any data we created
    await deleteUsersByUsername(ripley.username);
  });

  test('tuit list renders async', async () => {
    const newUser = await createUser(ripley);
    const newTuit = await createTuit(newUser._id, tuitSowell);
    tuitSowell._id=newTuit._id;
    const getTuit = await findAllTuits();

    render(
      <HashRouter>
        <Tuits tuits={getTuit} />
      </HashRouter>);

    const tuit = screen.getByText(/ellenripley's Tuit/i);
    expect(tuit).toBeInTheDocument();
  })
});



describe('tuit list renders mocked', () => {

  // setup test before running test
  beforeAll(async () => {
    jest.spyOn(axios, 'get').mockImplementation();
  });

  // clean up after test runs
  afterAll(async () => {
    jest.restoreAllMocks();
  });


  test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { tuit: MOCKED_TUITS } }));
    const response = await findAllTuits();
    const tuits = response.tuit;

    render(
      <HashRouter>
        <Tuits tuits={tuits} />
      </HashRouter>);

    const tuit = screen.getByText(/ellen's tuit/i);
    expect(tuit).toBeInTheDocument();
  });
})


