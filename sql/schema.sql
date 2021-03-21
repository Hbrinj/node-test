CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user" (
    user_id uuid DEFAULT uuid_generate_v4 (), 
    first_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS "plan" (
    plan_id uuid DEFAULT uuid_generate_v4 (), 
    plan_code VARCHAR(10) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    monthly_cost NUMERIC NOT NULL,
    annual_cost NUMERIC NOT NULL,
    PRIMARY KEY (plan_id)
);

CREATE TABLE IF NOT EXISTS "user_subscriptions_plan"
(
    "userUserId" uuid NOT NULL,
    "planPlanId" uuid NOT NULL,
    PRIMARY KEY ("userUserId", "planPlanId"),
    FOREIGN KEY ("userUserId")
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    FOREIGN KEY ("planPlanId")
        REFERENCES public.plan (plan_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

INSERT INTO "plan" (plan_code, plan_name, monthly_cost, annual_cost)
VALUES ('gb', 'UK', '1000', '5000');
INSERT INTO "plan" (plan_code, plan_name, monthly_cost, annual_cost)
VALUES ('fr', 'France', '1000', '6000');
INSERT INTO "plan" (plan_code, plan_name, monthly_cost, annual_cost)
VALUES ('de', 'Germany', '1500', '7500');
INSERT INTO "plan" (plan_code, plan_name, monthly_cost, annual_cost)
VALUES ('us', 'USA', '2500', '15000');
INSERT INTO "plan" (plan_code, plan_name, monthly_cost, annual_cost)
VALUES ('jp', 'Japan', '1500', '6500');