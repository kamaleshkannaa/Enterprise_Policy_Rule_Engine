# Enterprise Policy Rule Engine & Decision Platform

A comprehensive rule engine platform for defining, managing, and executing business rules dynamically across applications.

## Features

### Rule Management
- Create and manage business rules with priorities
- Organize rules into groups
- Version control for rule changes
- Activate/deactivate rules on demand
- Set effective date ranges for rules

### Rule Builder
- Visual interface for creating rules
- Define multiple conditions with AND/OR logic
- Configure actions to execute when rules match
- Support for various operators:
  - Equals, Not Equals
  - Greater Than, Less Than
  - Contains, Starts With, Ends With
  - In, Not In
  - Is Empty, Is Not Empty

### Rule Testing
- Test rules with sample data before deployment
- See real-time evaluation results
- View which conditions matched
- Preview actions that would execute

### Decision Logs
- Complete audit trail of all rule evaluations
- View input data and decisions made
- Track execution times
- Monitor actions taken

### Analytics Dashboard
- Monitor rule performance metrics
- Track decision statistics
- View match rates and execution times
- Analyze system health

## Technology Stack

- **Frontend**: React with TypeScript
- **Backend**: Supabase Edge Functions
- **Database**: PostgreSQL (Supabase)
- **Styling**: Tailwind CSS

## Database Schema

### Core Tables
- `rule_groups` - Organize rules into categories
- `rules` - Rule definitions with metadata
- `rule_conditions` - Conditions that trigger rules
- `rule_actions` - Actions to execute when rules match
- `decision_logs` - Audit trail of evaluations
- `rule_versions` - Historical tracking of changes

## API Usage

### Evaluate Rules Endpoint

Use the Edge Function to evaluate rules from any application:

**Endpoint**: `POST /functions/v1/evaluate-rules`

**Request Body**:
```json
{
  "inputData": {
    "amount": 5000,
    "creditScore": 720,
    "age": 30
  },
  "ruleGroupId": "optional-group-id",
  "metadata": {
    "userId": "123",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

**Response (Rule Matched)**:
```json
{
  "matched": true,
  "rule": {
    "id": "rule-uuid",
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

**Response (No Match)**:
```json
{
  "matched": false,
  "decision": "No Rule Matched",
  "actions": [],
  "executionTime": 12
}
```

### Example Integration

```typescript
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/evaluate-rules`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputData: {
        amount: 5000,
        customerType: 'premium',
      }
    })
  }
);

const result = await response.json();

if (result.matched) {
  console.log('Rule matched:', result.rule.name);
  console.log('Actions to take:', result.actions);
}
```

## Rule Examples

### Credit Approval Rule
**Conditions**:
- `creditScore >= 700` AND
- `age >= 18` AND
- `amount <= 50000`

**Actions**:
- Approve with automatic processing
- Notify applicant
- Update credit limit

### Discount Eligibility Rule
**Conditions**:
- `customerType = "premium"` OR
- `totalPurchases > 10000`

**Actions**:
- Apply 15% discount
- Add bonus points
- Send promotional email

## Getting Started

1. Access the dashboard at the root URL
2. Create a rule group (optional)
3. Create a new rule with the Rule Builder
4. Add conditions that define when the rule should match
5. Add actions to execute when conditions are met
6. Test the rule with sample data
7. Activate the rule
8. Use the API to evaluate rules from your applications

## Rule Priority

Rules are evaluated in priority order (highest first). When a rule matches:
- Evaluation stops (first match wins)
- Actions from that rule are executed
- Decision is logged for audit

## Security

- All tables have Row Level Security (RLS) enabled
- Authenticated users can manage rules
- Decision logs are immutable for audit compliance
- API requires authentication via Supabase

## Monitoring

Use the Analytics dashboard to:
- Track total decisions and match rates
- Monitor average execution times
- View system health metrics
- Identify top-performing rules

## Best Practices

1. **Use Descriptive Names**: Name rules clearly to indicate their purpose
2. **Set Priorities**: Higher priority for more specific rules
3. **Test Before Activating**: Use the Rule Tester to verify behavior
4. **Group Related Rules**: Organize rules into logical groups
5. **Monitor Performance**: Check analytics regularly
6. **Version Control**: Use descriptions when updating rules
7. **Effective Dates**: Set date ranges for seasonal rules
