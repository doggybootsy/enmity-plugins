import { Flux, Profiles, StyleSheet, Users } from "enmity/metro/common";
import { Component } from "react";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Text } from "./components/text";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function createThemedStyleSheet<T extends NamedStyles<T> | NamedStyles<any>>(styles: T & NamedStyles<any>): { [key in keyof T]: any } {
  return StyleSheet.createThemedStyleSheet(styles);
}

export function openUserProfile(userId: string) {
  if (!Users.getUser(userId)) {
    window.enmity.modules.common.AsyncUsers.fetchProfile(userId).then(() => {
      Profiles.showUserProfile({ userId });
    });
  } else {
    Profiles.showUserProfile({ userId });
  }
}

// FallbackProps definition
export type FallbackProps = { error: Error, info: React.ErrorInfo, self: ErrorBoundaryType };

// ErrorBoundary types
type ErrorBoundaryProps = React.PropsWithChildren<{ fallback?: React.ComponentType<FallbackProps> | React.ReactNode }>;
type ErrorBoundaryState = { hasError: true, error: Error, info: React.ErrorInfo } | { hasError: false };
type ErrorBoundaryType = React.Component<ErrorBoundaryProps, ErrorBoundaryState>;

export const ErrorBoundary = (() => {
  function ErrorBoundary(this: ErrorBoundaryType, props: ErrorBoundaryProps, context: any) {
    Component.call(this, props, context);
    this.state = { hasError: false };
  }

  // Inherit from React.Component
  ErrorBoundary.prototype = Object.create(Component.prototype);
  ErrorBoundary.prototype.constructor = ErrorBoundary;

  ErrorBoundary.prototype.componentDidCatch = function(this: ErrorBoundaryType, error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, error, info });
  }

  ErrorBoundary.prototype.render = function(this: ErrorBoundaryType) {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return <this.props.fallback error={this.state.error} info={this.state.info} self={this} />;
      }

      return this.props.fallback;
    }
    return this.props.children;
  }

  // Default props for ErrorBoundary
  ErrorBoundary.defaultProps = {
    fallback: <Text style={{ color: "red" }}>React Error</Text>
  };

  ErrorBoundary.displayName = "DoggyBootsy(ErrorBoundary)";

  return ErrorBoundary as any as React.ComponentClass<ErrorBoundaryProps, ErrorBoundaryState>;
})();

export function getStore(name: string) {
  return Flux.Store.getAll().find((store: any) => store.getName() === name);
}

export const useStateFromStores: <T>(stores: any[], getStateFromStores: () => T, deps?: React.DependencyList, areStatesEqual?: (oldState: T, newState: T) => boolean) => T = Flux.useStateFromStores;
