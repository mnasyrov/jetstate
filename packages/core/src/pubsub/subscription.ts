/**
 * Simple subscription interface which is compatible with RxJS/Subscription.
 */
export interface Subscription {
    unsubscribe(): void;
}
