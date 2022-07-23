import test, { expect } from "@playwright/test";
import { bookingPayload, updatedPayload } from "../../pages/api/apiPayload";

test.describe('API tests to create auth token', () => {
     let token: string;
     let bookingId: string;

    //Create new token
    test('Create new auth token', async({request}) => {
        const authResponse = await request.post('/auth', {
            data: {
                username: 'admin',
                password: 'password123'
            }
        });

        expect(authResponse.ok()).toBeTruthy();
        const resp = await authResponse.json();
        token = resp.token;
    });


    //Get all bookings
    test('Fetch all bookings from library',async({request}) => {
        const bookingAllResponse = await request.get('/booking');

        expect(bookingAllResponse.ok()).toBeTruthy();
    });

    //create a booking
    test('Create a new booking',async({request}) => {
        
        const newBookingResponse = await request.post('/booking', {
            data: bookingPayload
        });

        await newBookingResponse.json().then(responseBody => {
            bookingId = responseBody.bookingid;
            expect(`${responseBody.booking.firstname}`).toBe('Gokul');
            expect(`${responseBody.booking.totalprice}`).toBe('150');
        });
    })

    //update
    test('Update an existing booking', async({request}) => {

        const updatedBookingResp = await request.put(`/booking/${bookingId}`, {
            headers: {
                cookie: `token=${token}`
            },
            data: updatedPayload
        });

        expect(updatedBookingResp.ok()).toBeTruthy();

        await updatedBookingResp.json().then(responseBody => {
            expect(`${responseBody.firstname}`).toBe('Update-gokul');
            expect(`${responseBody.totalprice}`).toBe('200');
        });
    });

    //delete
    test('Delete an booking', async({request}) => {

        const deleteResp = await request.delete(`/booking/${bookingId}`, {
            headers: {
                cookie: `token=${token}`
            }
        });

        expect(deleteResp.ok()).toBeTruthy();
        expect(deleteResp.status()).toBe(201);
    })
});