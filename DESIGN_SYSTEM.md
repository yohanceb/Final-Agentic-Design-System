# FoodApp Agentic Design System

A comprehensive, AI-ready React UI component library built with TypeScript, Tailwind CSS, and Lucide React icons. Designed specifically for agentic UI patterns where AI agents can dynamically render, mutate, and control components.

## 🎨 Design Tokens

### Brand Colors (Polestar Tokens)

All colors are derived from a carefully curated set of brand tokens:

```typescript
export const FoodAppTokens = {
  brand: {
    primary: '#22C55E',    // Green - Main actions (Book Order, Pizza category)
    secondary: '#FACC15',  // Yellow - Ratings, stars, secondary actions
    surface: 'rgba(255, 255, 255, 0.7)', // Glass effect background
  },
  agent: {
    thinking: 'linear-gradient(90deg, #22C55E 0%, #4ADE80 50%, #22C55E 100%)',
    error: '#EF4444',      // Red - Errors and dangerous actions
  }
};
```

### Color Palette

Each brand color has a full 10-step palette for flexible styling:

- **Primary** (`food-primary`): Shades of green (50-900)
- **Secondary** (`food-secondary`): Shades of yellow (50-900)
- **Error** (`food-error`): Shades of red (50-900)

## 🧩 Components

### FoodAppButton

The foundational button component for the food ordering application.

#### Variants

| Variant | Usage | Visual |
|---------|-------|--------|
| `primary` | Main actions like "Book Order" | Green background, white text |
| `secondary` | Secondary actions like "Rate Item" | Yellow background, dark text |
| `agent-thinking` | AI processing states | Animated gradient, pulsing |
| `error` | Dangerous actions like "Cancel Order" | Red background, white text |
| `ghost` | Tertiary actions | Transparent with border |

#### Props

```typescript
interface FoodAppButtonProps extends AgenticBaseProps {
  variant?: FoodAppButtonVariant;      // Button style variant
  size?: 'sm' | 'md' | 'lg';           // Button size
  isLoading?: boolean;                  // Show loading spinner
  isError?: boolean;                    // Show error state
  isSuccess?: boolean;                  // Show success state
  agentContext?: AgentContext;          // AI agent metadata
  agentId?: string;                     // Unique agent identifier
  onAgentMutate?: (context) => void;   // Agent mutation callback
  children?: ReactNode;                 // Button content
}
```

#### Basic Usage

```typescript
import { FoodAppButton } from '@agentic-ui/food-design-system';

export function BookOrderButton() {
  return (
    <FoodAppButton 
      variant="primary"
      size="md"
      onClick={() => console.log('Booking order...')}
    >
      🍕 Book Order
    </FoodAppButton>
  );
}
```

#### With Agentic Context

```typescript
<FoodAppButton
  variant="primary"
  agentId="book-pizza-order"
  agentContext={{
    action: 'book_order',
    itemId: 'pizza-01',
    quantity: 2,
    metadata: {
      userId: 'user-123',
      timestamp: Date.now()
    }
  }}
  onAgentMutate={(ctx) => {
    console.log('Agent triggered mutation:', ctx);
  }}
>
  Book Pizza
</FoodAppButton>
```

#### With Loading State

```typescript
const [isLoading, setIsLoading] = useState(false);

<FoodAppButton
  variant="primary"
  isLoading={isLoading}
  onClick={async () => {
    setIsLoading(true);
    await bookOrder();
    setIsLoading(false);
  }}
>
  {isLoading ? 'Processing...' : 'Book Order'}
</FoodAppButton>
```

#### With Success/Error States

```typescript
const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

<FoodAppButton
  variant="primary"
  isSuccess={status === 'success'}
  isError={status === 'error'}
>
  {status === 'success' && '✓ Order Confirmed!'}
  {status === 'error' && '✗ Failed - Retry?'}
  {status === 'idle' && 'Book Order'}
</FoodAppButton>
```

## 🤖 Agentic Architecture

Every component in the design system is built to be "agentic" - meaning AI agents can programmatically:

1. **Detect** - Find components via `data-agent-id` and `data-agent-context`
2. **Mutate** - Trigger state changes via `onAgentMutate` callbacks
3. **Control** - Enable/disable, show/hide, or update via props
4. **Track** - Monitor state changes via agent context metadata

### AgenticBaseProps

All components extend these base props:

```typescript
export interface AgenticBaseProps {
  // Agent tracking
  agentContext?: AgentContext;
  agentId?: string;
  onAgentMutate?: (context: AgentContext) => void;
  
  // Standard props
  className?: string;
  disabled?: boolean;
}
```

### Agent Context Flow

```
User Action
    ↓
Component Event
    ↓
onAgentMutate Callback
    ↓
Agent Context Serialized → data-agent-context
    ↓
Agent Receives & Processes
    ↓
Next Action (UI Update, API Call, etc.)
```

## 🎯 Size Variants

All buttons support three sizes:

```typescript
<FoodAppButton size="sm">Small Button</FoodAppButton>     {/* 12px text */}
<FoodAppButton size="md">Medium Button</FoodAppButton>   {/* 16px text */}
<FoodAppButton size="lg">Large Button</FoodAppButton>   {/* 18px text */}
```

## 🎨 Tailwind Integration

The design system is fully integrated with Tailwind CSS through extended theme:

```typescript
// Available in Tailwind
<div className="bg-food-brand-primary">...</div>
<div className="bg-food-primary-500">...</div>
<div className="bg-food-secondary-400">...</div>
<div className="text-food-error-600">...</div>
```

## 🪝 Custom Hooks

### useAgenticState

Manage component state with built-in agent tracking:

```typescript
import { useAgenticState } from '@agentic-ui/food-design-system';

function MyComponent() {
  const {
    state,          // { isLoading, isError, isDirty, validationErrors }
    setLoading,     // (bool) => void
    setError,       // (bool) => void
    setDirty,       // (bool) => void
    handleAgentMutate  // (context) => void
  } = useAgenticState();

  return <div>{state.isLoading && 'Loading...'}</div>;
}
```

### useAgentTracking

Track component state changes for agent consumption:

```typescript
import { useAgentTracking } from '@agentic-ui/food-design-system';

function TrackableComponent() {
  const { context, updateContext } = useAgentTracking('my-component');

  return (
    <button 
      onClick={() => updateContext({ action: 'clicked' })}
      data-agent-context={JSON.stringify(context)}
    >
      Click me
    </button>
  );
}
```

## 📦 Tokens & Utilities

### Available Exports

```typescript
// Components
export { FoodAppButton };

// Tokens
export { FoodAppTokens, FoodAppColorPalette, ButtonVariants };

// Utilities
export { cn, generateAgentId, createAgentAttributes };

// Hooks
export { useAgenticState, useAgentTracking };
```

### Utility Functions

#### `cn()`
Merge Tailwind classes safely:

```typescript
import { cn } from '@agentic-ui/food-design-system';

const classes = cn('px-4', isActive && 'bg-green-500');
```

#### `generateAgentId()`
Create unique agent identifiers:

```typescript
import { generateAgentId } from '@agentic-ui/food-design-system';

const agentId = generateAgentId('button'); // "button-1715783942000-a1b2c3d4e"
```

#### `createAgentAttributes()`
Create data attributes for agent targeting:

```typescript
import { createAgentAttributes } from '@agentic-ui/food-design-system';

const attrs = createAgentAttributes('my-button', { action: 'book' });
// { 'data-agent-id': 'my-button', 'data-agent-context': '{"action":"book"}' }
```

## 🚀 AI Agent Integration Example

```typescript
// AI Agent Controller
async function bookOrderAgent(context: AgentContext) {
  const button = document.querySelector(`[data-agent-id="${context.agentId}"]`);
  
  // Find the button component
  if (button) {
    // Trigger mutation through the component's callback
    const event = new CustomEvent('agent-mutate', { detail: context });
    button.dispatchEvent(event);
    
    // Or use React state management to update the component
    setButtonState({ isLoading: true });
    
    // Process the order
    const result = await api.bookOrder(context.metadata);
    
    // Update component state based on result
    if (result.success) {
      setButtonState({ isSuccess: true });
    } else {
      setButtonState({ isError: true });
    }
  }
}
```

## 📱 Responsive Design

All components are fully responsive with Tailwind's mobile-first approach:

```typescript
<FoodAppButton className="w-full md:w-auto">
  Responsive Button
</FoodAppButton>
```

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

- Proper semantic HTML (`<button>`, `<input>`, etc.)
- Focus management with `:focus` rings
- Color contrast ratios meet AA standards
- Aria labels supported via props
- Keyboard navigation built-in

## 🔄 State Management Pattern

Components follow a clean state management pattern:

```typescript
interface ComponentState {
  isLoading: boolean;    // Async operation in progress
  isError: boolean;      // Error state
  isDirty: boolean;      // User has modified state
  validationErrors?: Record<string, string>; // Field errors
}
```

## 📚 Examples

See the [FoodAppButtonShowcase](./src/examples/FoodAppButtonShowcase.tsx) for comprehensive examples of:

- All button variants
- Size variations
- Loading states
- Success/error states
- Agent context usage
- Agentic prop patterns

## 🛠️ Development

### Running Tests

```bash
npm run test
```

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## 📄 License

MIT

---

**Built for AI-first UI development** 🤖
