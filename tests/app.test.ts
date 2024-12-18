import request from "supertest";
import app from "../src/server";
import {
    TEST_USER_EMAIL,
    TEST_USER_PASSWORD,
    TEST_FK_STORE,
    TEST_PURCHASE_ID,
    TEST_PRODUCT_ID,
} from "../src/utils/configs";

const payLoadLogin = {
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASSWORD,
    fk_store: TEST_FK_STORE,
};

const payLoadRegister = {
    rut: "99999999-9",
    name: "USER TEST",
    email: "testing999@test.com",
    password: "636363",
    fk_store: TEST_FK_STORE,
};

const purchaseId = TEST_PURCHASE_ID;

describe("Important entries", () => {
    let jwtToken: string;

    beforeAll(async () => {
        const response = await request(app)
            .post("/login")
            .send(payLoadLogin)
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);
        jwtToken = response.body.jwt;
    }, 50000);

    test("GET Verify JWT validity", async () => {
        const response = await request(app)
            .get("/verifyjwt")
            .set("Authorization", `Bearer ${jwtToken}`);
        expect(response.statusCode).toBe(200);
    });

    test("GET Check purchase", async () => {
        const response = await request(app)
            .get(`/purchase/check?id=${purchaseId}`)
            .set("Authorization", `Bearer ${jwtToken}`);
        expect(response.statusCode).toBe(200);
    });
});

describe("Registration and login process", () => {
    let jwtToken: string;

    beforeAll(async () => {
        const response = await request(app)
            .post("/login")
            .send(payLoadLogin)
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);
        jwtToken = response.body.jwt;
    }, 50000);

    test("POST register user", async () => {
        const response = await request(app)
            .post("/register")
            .send(payLoadRegister)
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);

        const responseLogin = await request(app).post("/login").send({
            email: payLoadRegister.email,
            password: payLoadRegister.password,
            fk_store: payLoadRegister.fk_store,
        });
        expect(responseLogin.statusCode).toBe(200);

        const getUser = await request(app)
            .get("/user")
            .set("Authorization", `Bearer ${responseLogin.body.jwt}`);
        expect(getUser.statusCode).toBe(200);

        console.log("User created with ID: ", getUser.body.id);
        const delUser = await request(app)
            .delete(`/user?id=${getUser.body.id}`)
            .set("Authorization", `Bearer ${jwtToken}`);
        expect(delUser.statusCode).toBe(200);
    });
});

describe("GET Store", () => {
    let jwtToken: string;

    beforeAll(async () => {
        const response = await request(app)
            .post("/login")
            .send(payLoadLogin)
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);
        jwtToken = response.body.jwt;
    }, 50000);

    test("GET Categories", async () => {
        const response = await request(app).get(
            `/categories?store=${payLoadLogin.fk_store}`
        );
        expect(response.statusCode).toBe(200);
    });
    test("GET Products", async () => {
        const response = await request(app).get(
            `/products?store=${TEST_FK_STORE}&limit_start=0&limit_end=10`
        );
        expect(response.statusCode).toBe(200);
    });
    test("GET Product", async () => {
        const response = await request(app).get(
            `/product?id=${TEST_PRODUCT_ID}`
        );
        expect(response.statusCode).toBe(200);
    });
});

describe("PUT Product", () => {
    let jwtToken: string;

    beforeAll(async () => {
        const response = await request(app)
            .post("/login")
            .send(payLoadLogin)
            .set("Content-Type", "application/json");
        expect(response.statusCode).toBe(200);
        jwtToken = response.body.jwt;
    }, 50000);

    test("PUT Product", async () => {
        const getProduct = await request(app).get(
            `/product?id=${TEST_PRODUCT_ID}`
        );
        expect(getProduct.statusCode).toBe(200);

        const response = await request(app)
            .put("/product")
            .send({
                id: getProduct.body.id,
                name: getProduct.body.name,
                description: getProduct.body.description,
                price: getProduct.body.price,
                stock: getProduct.body.stock.quantity,
                fk_category: getProduct.body.fk_category,
            })
            .set("Authorization", `Bearer ${jwtToken}`);
        expect(response.statusCode).toBe(200);
    });
});
