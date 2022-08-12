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
            expect(`${responseBody.booking.firstname}`).toBe(bookingPayload.firstname);
            expect(`${responseBody.booking.totalprice}`).toBe(bookingPayload.totalprice.toString());
        });
    });


    //Get booking details
    test('Fetch the booking details',async({request}) => {

        const fetchBookingResponse = await request.get(`/booking/${bookingId}`);

        expect(await fetchBookingResponse.ok()).toBeTruthy();
        expect(await fetchBookingResponse.json()).toMatchObject(bookingPayload);
        // if(JSON.stringify(await fetchBookingResponse.json()) !== JSON.stringify(bookingPayload)) throw new Error('JSON repsonse is not equal');
        
    });

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
            expect(`${responseBody.firstname}`).toBe(updatedPayload.firstname);
            expect(`${responseBody.totalprice}`).toBe(updatedPayload.totalprice.toString());
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