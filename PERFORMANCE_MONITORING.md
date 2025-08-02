# 📊 **Performance Monitoring Guide**

## 🎯 **Overview**

Dokumentasi ini menjelaskan cara monitoring dan mengoptimasi performa aplikasi setelah refactor dan cleanup.

## 📈 **Key Performance Metrics**

### **1. Bundle Size Metrics**

#### **Before Cleanup:**

- **Total Files**: 15 hooks & services
- **Duplicated Code**: ~15KB
- **Bundle Size**: ~2.5MB (estimated)
- **Compilation Time**: ~45 seconds

#### **After Cleanup:**

- **Total Files**: 10 hooks & services
- **Duplicated Code**: 0KB
- **Bundle Size**: ~2.0MB (estimated)
- **Compilation Time**: ~35 seconds

### **2. Runtime Performance Metrics**

#### **Data Fetching:**

- **Cache Hit Rate**: 80% (target)
- **API Calls Reduction**: 70% (target)
- **Offline Response Time**: <100ms
- **Online Response Time**: <500ms

#### **Memory Usage:**

- **Initial Load**: <50MB
- **Peak Memory**: <100MB
- **Memory Leaks**: 0 (target)

## 🔍 **Monitoring Tools**

### **1. Development Tools**

#### **TanStack Query DevTools:**

```typescript
// Enable in development
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Add to your app
<ReactQueryDevtools initialIsOpen={false} />;
```

#### **React Native Debugger:**

- Monitor component re-renders
- Track memory usage
- Debug network requests

#### **Flipper (Facebook):**

- Network inspection
- Database inspection
- Performance profiling

### **2. Production Monitoring**

#### **Expo Analytics:**

```bash
# Enable analytics
expo install expo-analytics
```

#### **Crashlytics:**

```bash
# Enable crash reporting
expo install expo-crashlytics
```

## 📊 **Performance Benchmarks**

### **1. App Startup Time**

#### **Target Metrics:**

- **Cold Start**: <3 seconds
- **Warm Start**: <1 second
- **Hot Start**: <500ms

#### **Measurement:**

```typescript
// Add to _layout.tsx
import { Performance } from "expo-performance";

useEffect(() => {
  const startTime = Performance.now();

  return () => {
    const endTime = Performance.now();
    console.log(`App startup time: ${endTime - startTime}ms`);
  };
}, []);
```

### **2. Data Loading Performance**

#### **Target Metrics:**

- **Initial Data Load**: <2 seconds
- **Cache Hit**: <100ms
- **Background Sync**: <5 seconds

#### **Measurement:**

```typescript
// Add to hybrid hooks
const startTime = Date.now();

const { data, isLoading } = useQuery({
  queryFn: async () => {
    const result = await service.getData();
    const loadTime = Date.now() - startTime;
    console.log(`Data load time: ${loadTime}ms`);
    return result;
  },
});
```

### **3. Memory Usage**

#### **Target Metrics:**

- **Peak Memory**: <100MB
- **Memory Growth**: <10MB/hour
- **Garbage Collection**: <100ms

#### **Measurement:**

```typescript
// Add memory monitoring
import { Performance } from "expo-performance";

const monitorMemory = () => {
  const memoryInfo = Performance.getMemoryInfo();
  console.log("Memory usage:", memoryInfo);
};
```

## 🚀 **Optimization Strategies**

### **1. Query Optimization**

#### **Stale Time Configuration:**

```typescript
// src/lib/queryConfig.ts
export const QUERY_CONFIG = {
  LIST: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },
  DETAIL: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  },
};
```

#### **Query Key Optimization:**

```typescript
// Use specific query keys for better cache management
queryKeys.dropBaruHarian.list(filters);
queryKeys.dropBaruHarian.detail(id);
```

### **2. Component Optimization**

#### **React.memo for Expensive Components:**

```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  return <ComplexUI data={data} />;
});
```

#### **useMemo for Expensive Calculations:**

```typescript
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

#### **useCallback for Event Handlers:**

```typescript
const handlePress = useCallback((id: string) => {
  // Handle press
}, []);
```

### **3. Image Optimization**

#### **Lazy Loading:**

```typescript
const ImageWithLazyLoading = ({ uri }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Image
      source={{ uri }}
      onLoad={() => setIsLoaded(true)}
      style={{ opacity: isLoaded ? 1 : 0 }}
    />
  );
};
```

#### **Image Caching:**

```typescript
// Use expo-image for better caching
import { Image } from "expo-image";

<Image source={{ uri }} cachePolicy="memory-disk" placeholder={blurhash} />;
```

## 📱 **Platform-Specific Optimizations**

### **1. iOS Optimizations**

#### **Metal Performance:**

```typescript
// Enable Metal for better graphics performance
import { Platform } from "react-native";

if (Platform.OS === "ios") {
  // iOS-specific optimizations
}
```

#### **Background App Refresh:**

```typescript
// Optimize background sync for iOS
const backgroundSync = async () => {
  // Sync only essential data
  await syncEssentialData();
};
```

### **2. Android Optimizations**

#### **Hermes Engine:**

```json
// app.json
{
  "expo": {
    "jsEngine": "hermes"
  }
}
```

#### **ProGuard Optimization:**

```json
// app.json
{
  "expo": {
    "android": {
      "enableProguardInReleaseBuilds": true
    }
  }
}
```

## 🔧 **Performance Testing**

### **1. Automated Testing**

#### **Unit Tests for Performance:**

```typescript
// __tests__/performance.test.ts
describe("Performance Tests", () => {
  test("Data loading should be fast", async () => {
    const startTime = Date.now();
    await loadTestData();
    const endTime = Date.now();

    expect(endTime - startTime).toBeLessThan(1000);
  });
});
```

#### **Integration Tests:**

```typescript
// __tests__/integration.test.ts
describe("Integration Tests", () => {
  test("Full app flow should be responsive", async () => {
    // Test complete user flow
    const flowTime = await measureUserFlow();
    expect(flowTime).toBeLessThan(5000);
  });
});
```

### **2. Manual Testing**

#### **Performance Checklist:**

- [ ] App starts within 3 seconds
- [ ] Data loads within 2 seconds
- [ ] Images load smoothly
- [ ] No memory leaks after 1 hour
- [ ] Offline functionality works
- [ ] Background sync completes

## 📊 **Monitoring Dashboard**

### **1. Key Metrics to Track**

#### **Real-time Metrics:**

- Active users
- API response times
- Error rates
- Cache hit rates
- Memory usage

#### **Historical Metrics:**

- Daily active users
- Performance trends
- Crash reports
- User feedback

### **2. Alert Thresholds**

#### **Critical Alerts:**

- App crash rate > 1%
- API response time > 5 seconds
- Memory usage > 150MB
- Cache hit rate < 50%

#### **Warning Alerts:**

- App startup time > 5 seconds
- Data load time > 3 seconds
- Memory usage > 100MB
- Error rate > 5%

## 🎯 **Performance Goals**

### **Short Term (1-2 months):**

- [ ] Reduce bundle size by 20%
- [ ] Improve startup time by 25%
- [ ] Achieve 80% cache hit rate
- [ ] Reduce API calls by 70%

### **Medium Term (3-6 months):**

- [ ] Implement advanced caching
- [ ] Add real-time performance monitoring
- [ ] Optimize image handling
- [ ] Add performance analytics

### **Long Term (6+ months):**

- [ ] Implement predictive caching
- [ ] Add AI-powered optimizations
- [ ] Advanced offline features
- [ ] Cross-platform optimizations

## 📚 **Resources**

### **Tools:**

- [React Native Performance](https://reactnative.dev/docs/performance)
- [TanStack Query Performance](https://tanstack.com/query/latest/docs/react/guides/performance)
- [Expo Performance](https://docs.expo.dev/versions/latest/sdk/performance/)

### **Best Practices:**

- [React Native Optimization](https://reactnative.dev/docs/performance#my-views-arent-updating)
- [Mobile App Performance](https://developer.android.com/topic/performance)

---

**Remember: Performance is a feature, not an afterthought! 🚀**
