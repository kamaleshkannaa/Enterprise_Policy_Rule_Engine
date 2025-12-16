# Rule Configuration Examples

This document provides real-world examples of rules you can create in the Rule Engine.

## Financial Services

### Auto Loan Approval Rule

**Rule Name**: Auto Loan Approval - Premium Tier
**Priority**: 100
**Group**: Credit Decisions

**Conditions**:
1. `creditScore` >= `720` AND
2. `income` >= `50000` AND
3. `employmentYears` >= `2` AND
4. `loanAmount` <= `35000`

**Actions**:
- **Type**: approve
  - Config: `{"approvalLevel": "automatic", "interestRate": 3.5}`
- **Type**: notify
  - Config: `{"channel": "email", "template": "loan-approved"}`

---

### Credit Card Limit Increase

**Rule Name**: Credit Limit Increase - Good Standing
**Priority**: 90
**Group**: Credit Management

**Conditions**:
1. `accountAge` >= `12` AND
2. `paymentHistory` = `"excellent"` AND
3. `creditUtilization` < `30` AND
4. `recentInquiries` < `2`

**Actions**:
- **Type**: modify
  - Config: `{"action": "increaseCreditLimit", "increasePercent": 20}`
- **Type**: notify
  - Config: `{"channel": "app", "message": "Credit limit increased!"}`

---

## E-Commerce

### VIP Customer Discount

**Rule Name**: VIP Lifetime Value Discount
**Priority**: 100
**Group**: Pricing Rules

**Conditions**:
1. `customerTier` = `"VIP"` OR
2. `lifetimeValue` > `10000`

**Actions**:
- **Type**: modify
  - Config: `{"discountPercent": 15, "applyTo": "order"}`
- **Type**: calculate
  - Config: `{"bonusPoints": 500}`

---

### Free Shipping Eligibility

**Rule Name**: Free Shipping Threshold
**Priority**: 80
**Group**: Shipping Rules

**Conditions**:
1. `orderTotal` >= `50` AND
2. `shippingCountry` = `"US"`

**Actions**:
- **Type**: modify
  - Config: `{"shippingCost": 0, "shippingMethod": "standard"}`

---

### Flash Sale Pricing

**Rule Name**: Weekend Flash Sale
**Priority**: 95
**Group**: Promotions

**Conditions**:
1. `productCategory` = `"electronics"` AND
2. `inventoryLevel` > `10`

**Actions**:
- **Type**: modify
  - Config: `{"discountPercent": 25, "label": "FLASH SALE"}`
- **Type**: notify
  - Config: `{"display": "badge", "text": "25% OFF"}`

---

## Insurance

### Auto Insurance Premium Calculation

**Rule Name**: Low Risk Driver Discount
**Priority**: 100
**Group**: Premium Calculation

**Conditions**:
1. `age` >= `25` AND
2. `age` <= `60` AND
3. `accidentHistory` = `0` AND
4. `yearsLicensed` >= `5`

**Actions**:
- **Type**: calculate
  - Config: `{"premiumDiscount": 20, "riskCategory": "low"}`
- **Type**: modify
  - Config: `{"coverageLevel": "comprehensive-eligible"}`

---

### Claim Auto-Approval

**Rule Name**: Small Claim Auto-Approval
**Priority**: 90
**Group**: Claims Processing

**Conditions**:
1. `claimAmount` <= `1000` AND
2. `customerTenure` > `24` AND
3. `claimsLastYear` = `0` AND
4. `documentationComplete` = `true`

**Actions**:
- **Type**: approve
  - Config: `{"approvalType": "automatic", "paymentDays": 3}`
- **Type**: notify
  - Config: `{"channel": "sms", "message": "Claim approved!"}`

---

## Healthcare

### Prescription Approval

**Rule Name**: Generic Medication Auto-Approval
**Priority**: 100
**Group**: Prescription Management

**Conditions**:
1. `medicationType` = `"generic"` AND
2. `patientAge` >= `18` AND
3. `drugInteractions` = `false` AND
4. `insuranceCoverage` = `true`

**Actions**:
- **Type**: approve
  - Config: `{"fulfillmentType": "automatic", "copay": 10}`
- **Type**: notify
  - Config: `{"channel": "portal", "message": "Prescription ready"}`

---

### Specialist Referral

**Rule Name**: Automatic Specialist Referral
**Priority**: 95
**Group**: Care Management

**Conditions**:
1. `symptomSeverity` >= `7` OR
2. `chronicCondition` = `true` AND
3. `primaryCareVisits` >= `3`

**Actions**:
- **Type**: escalate
  - Config: `{"department": "specialist-care", "urgency": "high"}`
- **Type**: assign
  - Config: `{"assignTo": "care-coordinator"}`

---

## Human Resources

### Leave Approval

**Rule Name**: Standard Leave Auto-Approval
**Priority**: 100
**Group**: Leave Management

**Conditions**:
1. `leaveType` = `"vacation"` AND
2. `leaveDays` <= `5` AND
3. `availableBalance` >= `leaveDays` AND
4. `teamCoverage` = `"adequate"`

**Actions**:
- **Type**: approve
  - Config: `{"notifyManager": true, "updateCalendar": true}`
- **Type**: modify
  - Config: `{"deductFromBalance": true}`

---

### Training Budget Approval

**Rule Name**: Individual Training Auto-Approval
**Priority**: 90
**Group**: Budget Management

**Conditions**:
1. `trainingCost` <= `1000` AND
2. `employeeTenure` >= `6` AND
3. `trainingBudgetUsed` < `80` AND
4. `managerApproved` = `true`

**Actions**:
- **Type**: approve
  - Config: `{"approvalLevel": "HR", "processingTime": "immediate"}`
- **Type**: notify
  - Config: `{"recipients": ["employee", "manager"], "channel": "email"}`

---

## IT Operations

### Access Request Approval

**Rule Name**: Standard Access Auto-Approval
**Priority**: 100
**Group**: Access Control

**Conditions**:
1. `accessLevel` = `"read-only"` AND
2. `employeeDepartment` = `requestedResourceDepartment` AND
3. `backgroundCheckComplete` = `true`

**Actions**:
- **Type**: approve
  - Config: `{"grantAccess": true, "duration": "permanent"}`
- **Type**: log
  - Config: `{"auditLevel": "standard", "retain": "7years"}`

---

### Incident Auto-Routing

**Rule Name**: Critical Incident Escalation
**Priority**: 100
**Group**: Incident Management

**Conditions**:
1. `severity` = `"critical"` OR
2. (`severity` = `"high"` AND `affectedUsers` > `1000`)

**Actions**:
- **Type**: escalate
  - Config: `{"team": "on-call-engineers", "notifyVia": "phone"}`
- **Type**: assign
  - Config: `{"priority": "P1", "sla": "15minutes"}`
- **Type**: notify
  - Config: `{"stakeholders": ["CTO", "VP-Engineering"]}`

---

## Retail & Inventory

### Reorder Point Alert

**Rule Name**: Low Stock Auto-Reorder
**Priority**: 100
**Group**: Inventory Management

**Conditions**:
1. `currentStock` <= `reorderPoint` AND
2. `demandTrend` = `"increasing"` AND
3. `supplierAvailability` = `true`

**Actions**:
- **Type**: notify
  - Config: `{"recipient": "purchasing", "urgency": "high"}`
- **Type**: calculate
  - Config: `{"orderQuantity": "economicOrderQuantity", "supplier": "preferred"}`

---

### Dynamic Pricing

**Rule Name**: Clearance Pricing
**Priority**: 95
**Group**: Pricing Strategy

**Conditions**:
1. `daysInInventory` > `90` AND
2. `seasonalItem` = `true` AND
3. `currentStock` > `minimumStock`

**Actions**:
- **Type**: modify
  - Config: `{"priceReduction": 40, "label": "CLEARANCE"}`
- **Type**: notify
  - Config: `{"channel": "marketing", "campaign": "clearance-sale"}`

---

## Customer Service

### Ticket Priority Assignment

**Rule Name**: VIP Customer Priority
**Priority**: 100
**Group**: Ticket Routing

**Conditions**:
1. `customerTier` = `"VIP"` OR
2. `accountValue` > `50000` OR
3. `issueType` = `"service-outage"`

**Actions**:
- **Type**: assign
  - Config: `{"queue": "priority-support", "priority": "high"}`
- **Type**: escalate
  - Config: `{"notifySupervisor": true, "slaMinutes": 15}`

---

### Refund Auto-Approval

**Rule Name**: Small Value Refund
**Priority**: 90
**Group**: Refund Processing

**Conditions**:
1. `refundAmount` <= `50` AND
2. `orderAge` <= `30` AND
3. `customerHistory` = `"good"` AND
4. `refundCount90Days` < `3`

**Actions**:
- **Type**: approve
  - Config: `{"refundMethod": "original-payment", "processDays": 1}`
- **Type**: notify
  - Config: `{"channel": "email", "template": "refund-approved"}`

---

## Field Data Types

Common field types used in rules:

- **Numeric**: `amount`, `score`, `count`, `age`, `duration`
- **Text**: `status`, `category`, `type`, `tier`, `department`
- **Boolean**: `isActive`, `hasPermission`, `isComplete`, `verified`
- **Date**: `createdAt`, `expiresAt`, `memberSince`
- **Array**: `tags`, `categories`, `permissions`

## Operator Usage Guide

- **equals/not_equals**: Exact matching
- **greater_than/less_than**: Numeric comparisons
- **contains**: Text substring search
- **starts_with/ends_with**: Text prefix/suffix matching
- **in/not_in**: Array membership
- **is_empty/is_not_empty**: Null/undefined checks
