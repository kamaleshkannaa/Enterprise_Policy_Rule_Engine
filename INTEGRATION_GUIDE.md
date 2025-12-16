# Integration Guide

This guide shows how to integrate the Rule Engine into your applications.

## Quick Start

### 1. Import the Client

```typescript
import { ruleEngineClient } from './lib/apiClient';
```

### 2. Evaluate Rules

```typescript
const result = await ruleEngineClient.evaluateRules({
  inputData: {
    amount: 5000,
    creditScore: 720,
    age: 30,
    employmentType: 'full-time'
  },
  metadata: {
    applicationId: 'APP-12345',
    timestamp: new Date().toISOString()
  }
});

if (result.matched) {
  console.log(`Rule "${result.rule?.name}" matched!`);
  result.actions.forEach(action => {
    console.log(`Execute action: ${action.type}`);
  });
}
```

## Use Cases

### Credit Application Processing

```typescript
async function processCreditApplication(application: CreditApplication) {
  const result = await ruleEngineClient.evaluateRules({
    inputData: {
      amount: application.requestedAmount,
      creditScore: application.creditScore,
      age: application.age,
      income: application.annualIncome,
      existingLoans: application.currentLoans
    },
    ruleGroupId: 'credit-approval-rules',
    metadata: {
      applicationId: application.id,
      applicantId: application.userId
    }
  });

  if (result.matched) {
    const approveAction = result.actions.find(a => a.type === 'approve');
    if (approveAction) {
      return await approveApplication(application, approveAction.config);
    }
  }

  return await rejectApplication(application);
}
```

### Discount Calculation

```typescript
async function calculateDiscount(customer: Customer, orderTotal: number) {
  const result = await ruleEngineClient.evaluateRules({
    inputData: {
      customerType: customer.tier,
      totalPurchases: customer.lifetimeValue,
      orderAmount: orderTotal,
      memberSince: customer.memberSince
    },
    ruleGroupId: 'discount-rules'
  });

  let discount = 0;
  if (result.matched) {
    const discountAction = result.actions.find(a => a.type === 'modify');
    if (discountAction?.config?.discountPercent) {
      discount = discountAction.config.discountPercent;
    }
  }

  return {
    originalAmount: orderTotal,
    discount: discount,
    finalAmount: orderTotal * (1 - discount / 100)
  };
}
```

### Access Control

```typescript
async function checkAccess(user: User, resource: Resource) {
  const result = await ruleEngineClient.evaluateRules({
    inputData: {
      userId: user.id,
      userRole: user.role,
      resourceType: resource.type,
      resourceOwner: resource.ownerId,
      department: user.department
    },
    ruleGroupId: 'access-control-rules',
    metadata: {
      ipAddress: request.ip,
      timestamp: new Date().toISOString()
    }
  });

  if (result.matched) {
    const approveAction = result.actions.find(a => a.type === 'approve');
    return approveAction !== undefined;
  }

  return false;
}
```

### Fraud Detection

```typescript
async function checkFraudRisk(transaction: Transaction) {
  const result = await ruleEngineClient.evaluateRules({
    inputData: {
      amount: transaction.amount,
      location: transaction.location,
      deviceId: transaction.deviceId,
      customerAge: transaction.customer.accountAge,
      transactionCount24h: transaction.customer.recentTransactionCount,
      averageTransactionAmount: transaction.customer.avgAmount
    },
    ruleGroupId: 'fraud-detection-rules',
    metadata: {
      transactionId: transaction.id,
      customerId: transaction.customerId
    }
  });

  if (result.matched) {
    const escalateAction = result.actions.find(a => a.type === 'escalate');
    if (escalateAction) {
      await escalateToFraudTeam(transaction, escalateAction.config);
      return { approved: false, reason: 'Fraud risk detected' };
    }
  }

  return { approved: true };
}
```

### Workflow Automation

```typescript
async function routeTicket(ticket: SupportTicket) {
  const result = await ruleEngineClient.evaluateRules({
    inputData: {
      priority: ticket.priority,
      category: ticket.category,
      customerTier: ticket.customer.tier,
      issueType: ticket.issueType,
      estimatedValue: ticket.potentialRevenue
    },
    ruleGroupId: 'ticket-routing-rules'
  });

  if (result.matched) {
    const assignAction = result.actions.find(a => a.type === 'assign');
    if (assignAction?.config?.teamId) {
      await assignTicketToTeam(ticket, assignAction.config.teamId);
      return assignAction.config.teamId;
    }
  }

  return 'general-support';
}
```

## Error Handling

```typescript
try {
  const result = await ruleEngineClient.evaluateRules({
    inputData: myData
  });

  // Process result
} catch (error) {
  console.error('Rule evaluation failed:', error);

  // Fallback logic
  return defaultDecision();
}
```

## Performance Tips

1. **Cache Rule Groups**: If evaluating the same group frequently, store the ID
2. **Batch Evaluations**: Process multiple items in parallel
3. **Monitor Execution Times**: Check the `executionTime` field in responses
4. **Use Specific Groups**: Filter by `ruleGroupId` for faster evaluation

## Testing Integration

```typescript
// test/ruleEngine.test.ts
describe('Rule Engine Integration', () => {
  it('should approve high credit score applications', async () => {
    const result = await ruleEngineClient.evaluateRules({
      inputData: {
        creditScore: 750,
        age: 35,
        amount: 10000
      }
    });

    expect(result.matched).toBe(true);
    expect(result.actions.some(a => a.type === 'approve')).toBe(true);
  });

  it('should reject low credit score applications', async () => {
    const result = await ruleEngineClient.evaluateRules({
      inputData: {
        creditScore: 500,
        age: 25,
        amount: 10000
      }
    });

    expect(result.matched).toBe(false);
  });
});
```

## Advanced Features

### Custom Metadata

Add context to decisions for better auditing:

```typescript
await ruleEngineClient.evaluateRules({
  inputData: myData,
  metadata: {
    userId: currentUser.id,
    sessionId: session.id,
    source: 'mobile-app',
    version: '2.1.0',
    environment: 'production'
  }
});
```

### Conditional Actions

Use action configs to make decisions:

```typescript
const result = await ruleEngineClient.evaluateRules({ inputData });

if (result.matched) {
  for (const action of result.actions) {
    switch (action.type) {
      case 'notify':
        await sendNotification(action.config.recipient, action.config.message);
        break;
      case 'modify':
        applyModifications(action.config);
        break;
      case 'escalate':
        await escalate(action.config.department, action.config.priority);
        break;
    }
  }
}
```

## Best Practices

1. **Always handle errors**: Network issues can occur
2. **Log decisions**: Use metadata for audit trails
3. **Test rules thoroughly**: Use the Rule Tester before production
4. **Monitor performance**: Track execution times
5. **Version your rules**: Update descriptions when changing rules
6. **Use meaningful field names**: Make rules self-documenting
7. **Group related rules**: Organize by business domain
8. **Set appropriate priorities**: Critical rules should have high priority
