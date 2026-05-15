# OrderButton - Emotion Design System

A sophisticated action button component designed with the Emotion Design System philosophy, featuring agentic AI capabilities for modern food ordering workflows.

## 🎨 Visual Design

### Specifications
- **Size**: Large with generous padding (px-8 py-4)
- **Border Radius**: Rounded-2xl for modern, friendly appearance
- **Text**: White, semibold font
- **Primary Color**: #22C55E (Green 500)
- **Success Color**: #15803D (Dark Green 700)
- **Special Effect**: Subtle inner glow using gradient overlay

### Color System

```typescript
Default State:   #22C55E (Green 500)
Success State:   #15803D (Green 700)
Hover:           Darkened shade with enhanced shadow
Active (Click):  Scale down to 95% with immediate feedback
Disabled:        50% opacity
```

## 🔄 State Machine

### 1. Default State
**Visual**: Static green button with "Book Order" label
```
- Background: #22C55E
- Text: White "🍕 Book Order"
- Effect: Inner glow gradient
- Interaction: Clickable, transitions to loading
```

### 2. Agent-Loading State
**Visual**: Pulsing animation with AI processing indicator
```
- Background: #22C55E (same as default)
- Animation: Continuous pulse effect
- Icon: Lucide Sparkles (rotating)
- Text: "Calculating..."
- State: Disabled (prevents double-click)
- Purpose: Shows AI agent is computing delivery/taxes
```

### 3. Success State
**Visual**: Dark green with confirmation indicator
```
- Background: #15803D (darker green)
- Icon: Lucide CheckCircle2 (appears with spin animation)
- Text: "Order Tracking"
- Effect: Triggers onIntentComplete callback
- Purpose: Confirms order and enables navigation
```

## 🤖 Agentic Integration

### Agentic Props

```typescript
interface OrderButtonProps extends AgenticBaseProps {
  // AI agent callback - fires when order is confirmed
  onIntentComplete?: (context: {
    action: 'order_complete';
    timestamp: number;
    metadata?: Record<string, unknown>;
  }) => void;

  // Custom label (default: "Book Order")
  label?: string;

  // Metadata for intent completion
  metadata?: Record<string, unknown>;

  // From AgenticBaseProps:
  agentContext?: AgentContext;
  agentId?: string;
  onAgentMutate?: (context: AgentContext) => void;
  disabled?: boolean;
}
```

### Agent Flow

```
┌─────────────────────────────────────────┐
│  1. User Interaction / Agent Detection  │
│  - Click button or agent finds via ID   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  2. onAgentMutate Triggered             │
│  - Sends: { action: 'order_initiated' } │
│  - AI receives context                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│  3. Loading State                       │
│  - Button shows: Sparkles + Calculating │
│  - Component: Disabled/pointer-events   │
│  - AI: Processing delivery/taxes        │
└────────────────┬────────────────────────┘
                 │
          (AI processing)
                 │
                 ▼
┌─────────────────────────────────────────┐
│  4. Success State                       │
│  - Button shows: Checkmark + Tracking   │
│  - Background: Dark green               │
│  - Fires: onIntentComplete callback     │
│  - AI: Navigate to tracking page        │
└─────────────────────────────────────────┘
```

## 📝 Usage Examples

### Basic Usage

```typescript
import { OrderButton } from '@agentic-ui/food-design-system';

export function OrderFlow() {
  return (
    <OrderButton
      onClick={() => console.log('Order initiated')}
    />
  );
}
```

### With Agent Context

```typescript
<OrderButton
  agentId="main-order-button"
  agentContext={{
    action: 'book_order',
    itemId: 'pizza-margherita',
    quantity: 1,
  }}
  metadata={{
    userId: 'user-123',
    orderType: 'delivery',
  }}
  onIntentComplete={(context) => {
    console.log('Order confirmed:', context);
    navigate(`/tracking/${context.metadata?.orderId}`);
  }}
  onAgentMutate={(ctx) => {
    console.log('Agent triggered mutation:', ctx);
  }}
/>
```

### With Agent State Management

```typescript
const orderButtonRef = useRef<any>(null);

// Simulate agent processing
const processOrderWithAgent = async () => {
  // Start loading
  orderButtonRef.current?.setLoadingState();

  // AI processes order (delivery calculation, etc.)
  const result = await agentAPI.calculateOrder({ itemId: 'pizza-01' });

  // Transition to success
  orderButtonRef.current?.setSuccessState();
};

<OrderButton
  ref={orderButtonRef}
  onClick={processOrderWithAgent}
  onIntentComplete={() => navigate('/tracking')}
/>
```

### Custom Label

```typescript
<OrderButton label="Complete Purchase" />
```

### With Conditional Rendering

```typescript
const [isOrderValid, setIsOrderValid] = useState(false);

<OrderButton
  disabled={!isOrderValid}
  label={isOrderValid ? 'Book Order' : 'Add Items to Order'}
  onIntentComplete={() => {
    setIsOrderValid(false); // Reset for next order
  }}
/>
```

## 🎯 Imperative API

The OrderButton supports imperative state control for programmatic updates:

```typescript
const buttonRef = useRef<any>(null);

// Manually control state
buttonRef.current?.setLoadingState();   // Show calculating...
buttonRef.current?.setSuccessState();   // Show checkmark
buttonRef.current?.setDefaultState();   // Reset to default

// Read current state
const current = buttonRef.current?.currentState; // 'default' | 'loading' | 'success'
```

## ✨ Visual Effects

### Inner Glow
Applied in all states using a gradient overlay:
```typescript
<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
```

### Pulse Animation (Loading)
```css
animate-pulse /* Built-in Tailwind animation */
```

### Scale Animation (Click)
```css
active:scale-95 /* Instant visual feedback */
```

### Spin Animation (Success Icon)
```typescript
animate-in spin-in duration-300
```

## 🔍 Data Attributes

For AI agent targeting and inspection:

```html
<button
  data-agent-id="main-order-button"
  data-order-state="loading"
  data-agent-context='{"action":"book_order",...}'
>
  ...
</button>
```

## 🎨 CSS Classes Applied

### All States
```
relative px-8 py-4 text-lg font-semibold rounded-2xl 
transition-all duration-300 focus:outline-none 
focus:ring-2 focus:ring-offset-2 focus:ring-green-400 
flex items-center justify-center gap-3 overflow-hidden
```

### Default State
```
bg-green-500 text-white hover:bg-green-600 active:scale-95 
shadow-lg hover:shadow-xl
```

### Loading State
```
bg-green-500 text-white shadow-lg animate-pulse 
cursor-wait pointer-events-none
```

### Success State
```
bg-green-700 text-white shadow-lg hover:bg-green-800 active:scale-95
```

## ♿ Accessibility

- **Focus Management**: Green focus ring (`focus:ring-2 focus:ring-green-400`)
- **Semantic HTML**: Native `<button>` element
- **Color Contrast**: WCAG AA compliant (both states)
- **Icons**: SVG icons from Lucide React
- **State Indication**: Clear visual states for loading/success
- **Keyboard Navigation**: Full keyboard support

## 🧪 Testing

### Test Cases

```typescript
// State transitions
it('transitions from default to loading on click', () => {
  // Verify button state changes
});

it('calls onIntentComplete on success', () => {
  // Verify callback fired
});

// Agent integration
it('calls onAgentMutate with context', () => {
  // Verify agent callback
});

it('disables button during loading', () => {
  // Verify pointer-events disabled
});

// Accessibility
it('has proper focus ring', () => {
  // Verify focus styles
});

it('supports keyboard activation', () => {
  // Verify Enter/Space triggers click
});
```

## 🔌 Integration with Other Components

The OrderButton follows the same agentic patterns as other design system components:

- **AgenticBaseProps**: Standard props for all agentic components
- **Agent Context**: Serialized and passed in `data-agent-context`
- **Callbacks**: `onAgentMutate` and component-specific callbacks
- **State Management**: Imperative API for external control

## 📦 Related Components

- **FoodAppButton**: Generic button with multiple variants
- **Button**: Base button component
- **useAgenticState**: Hook for state management
- **useAgentTracking**: Hook for agent tracking

## 🚀 Performance Considerations

- **Animation**: CSS-based animations (hardware accelerated)
- **Re-renders**: State isolated in component
- **Icons**: Lucide React (tree-shakeable)
- **Transitions**: GPU-accelerated transforms

## 📚 Complete Implementation

See [OrderButtonShowcase.tsx](./src/examples/OrderButtonShowcase.tsx) for:
- Interactive demo of all states
- Agent flow simulation
- Integration log
- State machine visualization
- Full props documentation
- Code examples

---

**Built with the Emotion Design System and Agentic AI in mind** 🤖💚
