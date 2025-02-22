#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ShopStack } from "../lib/cdk-shop-stack";

const app = new cdk.App();
new ShopStack(app, "ShopStack");