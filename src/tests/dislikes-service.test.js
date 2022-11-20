import { userTogglesTuitLikes, findAllTuitsLikedByUser } from '../services/likes-service';
import { userTogglesTuitDisLikes, findAllTuitsDisLikedByUser } from '../services/dislikes-service';
import { createTuit, createTuitByUser, deleteTuit, findAllTuits, findTuitById } from '../services/tuits-service';
import {
    createUser,
    deleteUser,
    deleteUsersByUsername, findAllUsers,
    findUserById
} from "../services/users-service";

describe('can toggle dislike with REST API', () => {
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
        tuitSowell = {
            tuit: 'Test Tuit',
        }
        const newTuit = await createTuit(sowell.uniqueId, tuitSowell);
        tuitSowell._id = newTuit._id;
    });

    afterAll(async () => {
        await userTogglesTuitLikes(sowell.uniqueId, tuitSowell._id);
        await deleteTuit(tuitSowell._id);
        await deleteUser(sowell.uniqueId);
    });

    test('Testing creation of tuit', async () => {
        const toggledTuit = await userTogglesTuitDisLikes(sowell.uniqueId, tuitSowell._id);
        const dislikedTuits = await findAllTuitsDisLikedByUser(sowell.uniqueId);
        expect(dislikedTuits[0].stats.dislikes).toEqual(1);
    });



});

describe('can find disliked tuits with REST API', () => {
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
        tuitSowell = {
            tuit: 'Test Tuit',
        }
        const newTuit = await createTuit(sowell.uniqueId, tuitSowell);
        tuitSowell._id = newTuit._id;
    });

    afterAll(async () => {
        await userTogglesTuitLikes(sowell.uniqueId, tuitSowell._id);
        await deleteTuit(tuitSowell._id);
        await deleteUser(sowell.uniqueId);
    });

    test('Testing creation of tuit', async () => {
        const toggledTuit = await userTogglesTuitDisLikes(sowell.uniqueId, tuitSowell._id);
        const dislikedTuits = await findAllTuitsDisLikedByUser(sowell.uniqueId);
        expect(dislikedTuits.length).toEqual(1);
        expect(dislikedTuits[0]._id).toEqual(tuitSowell._id);
    });



});