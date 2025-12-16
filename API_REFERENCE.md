# API Reference

Complete reference for the Rule Engine API.

## Endpoints

### Evaluate Rules

Evaluates rules against input data and returns matching rule with actions.

**Endpoint**: `POST /functions/v1/evaluate-rules`

**Authentication**: Required (Bearer token)

**Request Headers**:
```
Authorization: Bearer YOUR_SUPABASE_ANON_KEY
Content-Type: application/json
```

**Request Body**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `inputData` | object | Yes | Data to evaluate against rules |
| `ruleGroupId` | string | No | Filter rules by group ID |
| `metadata` | object | No | Additional context for logging |

**Example Request**:
```json
{
  "inputData": {
    "amount": 5000,
    "creditScore": 720,
    "age": 30
  },
  "ruleGroupId": "credit-rules",
  "metadata": {
    "userId": "user-123",
    "source": "web-app"
  }
}
```

**Response (Success - Rule Matched)**:

```json
{
  "matched": true,
  "rule": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Credit Approval Rule",
    "priority": 100
  },
  "decision": "Rule Matched",
  "actions": [
    {
      "type": "approve",
      "config": {
        "approvalLevel": "automatic"
      }
    }
  ],
  "executionTime": 15
}
```

**Response (Success - No Match)**:

```json
{
  "matched": false,
  "decision": "No Rule Matched",
  "actions": [],
  "executionTime": 12
}
```

**Response (Error)**:

```json
{
  "error": "inputData is required"
}
```

**Status Codes**:
- `200` - Success
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (invalid token)
- `500` - Server Error

---

## Operators

### Comparison Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `equals` | Exact equality | `status = "active"` |
| `not_equals` | Not equal | `type != "guest"` |
| `greater_than` | Numeric greater than | `age > 18` |
| `less_than` | Numeric less than | `amount < 1000` |
| `greater_than_or_equal` | Numeric >= | `score >= 700` |
| `less_than_or_equal` | Numeric <= | `price <= 50` |

### String Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `contains` | Substring match | `email contains "@company.com"` |
| `not_contains` | Not a substring | `name not_contains "test"` |
| `starts_with` | Prefix match | `code starts_with "PRO"` |
| `ends_with` | Suffix match | `file ends_with ".pdf"` |

### Collection Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `in` | Value in array | `status in ["active", "pending"]` |
| `not_in` | Value not in array | `role not_in ["guest", "visitor"]` |

### Null Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `is_empty` | Null, undefined, or empty string | `middleName is_empty` |
| `is_not_empty` | Has a value | `phoneNumber is_not_empty` |

---

## Action Types

### Standard Actions

| Action Type | Description | Common Config |
|-------------|-------------|---------------|
| `approve` | Approve a request | `{"approvalLevel": "automatic"}` |
| `reject` | Reject a request | `{"reason": "insufficient-credit"}` |
| `modify` | Modify data/values | `{"discountPercent": 15}` |
| `notify` | Send notification | `{"channel": "email", "template": "approved"}` |
| `log` | Log an event | `{"level": "info", "message": "Rule matched"}` |
| `escalate` | Escalate to team | `{"team": "senior-agents", "priority": "high"}` |
| `assign` | Assign to person/team | `{"assignTo": "team-id", "priority": "normal"}` |
| `calculate` | Calculate value | `{"formula": "amount * 0.15"}` |

### Action Configuration Examples

#### Approve Action
```json
{
  "type": "approve",
  "config": {
    "approvalLevel": "automatic",
    "approver": "system",
    "notes": "Auto-approved based on criteria"
  }
}
```

#### Reject Action
```json
{
  "type": "reject",
  "config": {
    "reason": "Does not meet minimum requirements",
    "appealable": true,
    "appealDepartment": "appeals"
  }
}
```

#### Modify Action
```json
{
  "type": "modify",
  "config": {
    "field": "price",
    "operation": "multiply",
    "value": 0.85,
    "label": "15% discount applied"
  }
}
```

#### Notify Action
```json
{
  "type": "notify",
  "config": {
    "channel": "email",
    "recipients": ["user@example.com"],
    "template": "approval-notification",
    "priority": "high"
  }
}
```

#### Escalate Action
```json
{
  "type": "escalate",
  "config": {
    "department": "senior-management",
    "reason": "High-value transaction",
    "urgency": "immediate",
    "notifyVia": ["email", "sms"]
  }
}
```

#### Assign Action
```json
{
  "type": "assign",
  "config": {
    "assignTo": "team-vip-support",
    "priority": "high",
    "sla": "30minutes",
    "autoReassign": true
  }
}
```

#### Calculate Action
```json
{
  "type": "calculate",
  "config": {
    "resultField": "finalPrice",
    "formula": "basePrice * (1 - discountPercent / 100)",
    "roundTo": 2
  }
}
```

---

## Logical Operators

When chaining multiple conditions:

| Operator | Description |
|----------|-------------|
| `AND` | All conditions must be true |
| `OR` | At least one condition must be true |

**Example**:
```
Condition 1: creditScore >= 700 AND
Condition 2: income > 50000 AND
Condition 3: age >= 21
```

All three conditions must be met for the rule to match.

**Example with OR**:
```
Condition 1: customerTier = "VIP" OR
Condition 2: lifetimeValue > 10000
```

Either condition can be true for the rule to match.

---

## Field Path Notation

Support for nested object access:

```json
{
  "customer": {
    "profile": {
      "age": 30,
      "address": {
        "country": "US"
      }
    }
  }
}
```

Access nested fields using dot notation:
- `customer.profile.age`
- `customer.profile.address.country`

---

## Rate Limits

No rate limits currently enforced. Monitor your usage through the Analytics dashboard.

---

## Error Codes

| Code | Description | Solution |
|------|-------------|----------|
| `400` | Invalid request | Check request body format |
| `401` | Unauthorized | Verify authentication token |
| `404` | Not found | Check endpoint URL |
| `500` | Server error | Retry request or contact support |

---

## Best Practices

1. **Input Validation**: Validate data before sending to API
2. **Error Handling**: Always wrap API calls in try-catch
3. **Timeout Handling**: Set reasonable timeouts (5-10 seconds)
4. **Retry Logic**: Implement exponential backoff for failures
5. **Logging**: Log all decisions for audit purposes
6. **Testing**: Test rules thoroughly before production use
7. **Monitoring**: Track execution times and match rates

---

## TypeScript Types

```typescript
interface EvaluateRulesRequest {
  inputData: Record<string, any>;
  ruleGroupId?: string;
  metadata?: Record<string, any>;
}

interface EvaluateRulesResponse {
  matched: boolean;
  rule?: {
    id: string;
    name: string;
    priority: number;
  };
  decision: string;
  actions: Array<{
    type: string;
    config: any;
  }>;
  executionTime: number;
}

interface ErrorResponse {
  error: string;
}
```

---

## Support

For issues or questions:
1. Check the Analytics dashboard for system health
2. Review Decision Logs for execution details
3. Test rules using the Rule Tester
4. Check this documentation for API details
