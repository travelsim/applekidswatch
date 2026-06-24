/**
 * Shared error handling utilities for TypeScript projects.
 * Standardizes error types, unknown catch handling, and safe error messaging.
 * 
 * Usage:
 * - Import { ApiError, getErrorMessage, isApiError } from '@/shared/errors' (or adjust alias)
 * - In catch (error: unknown) { const msg = getErrorMessage(error); ... }
 */

export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export class ValidationError extends ApiError {
  public readonly details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message, 400, "VALIDATION_ERROR");
    this.details = details;
  }
}

export class ExternalApiError extends ApiError {
  public readonly service: string;

  constructor(service: string, message: string, status: number = 502) {
    super(`${service} error: ${message}`, status, "EXTERNAL_API_ERROR");
    this.service = service;
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

/**
 * Safely extract a human-readable message from any thrown value.
 * Prevents leaking stack traces or sensitive data in client responses.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    const msg = (error as Record<string, unknown>).message;
    if (typeof msg === "string") return msg;
  }
  if (error && typeof error === "object" && "error" in error) {
    const err = (error as Record<string, unknown>).error;
    if (typeof err === "string") return err;
  }
  return "An unexpected error occurred";
}

/**
 * Type guard for ApiError instances.
 */
export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Type guard for Zod errors (common in validation).
 */
export function isZodError(error: unknown): error is { issues: Array<{ message: string }> } {
  return (
    error !== null &&
    typeof error === "object" &&
    "issues" in error &&
    Array.isArray((error as { issues?: unknown }).issues)
  );
}

/**
 * Express-compatible error handler middleware.
 * Use after routes: app.use(errorHandler);
 * 
 * In development shows more info; production safe messages only.
 */
import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = isApiError(err) ? err.status : 500;
  const message = getErrorMessage(err);

  // Log full error server-side only (never send stack to client in prod)
  if (process.env.NODE_ENV !== "production") {
    console.error("Error handler:", err);
  } else {
    console.error(`[${new Date().toISOString()}] ${status} error: ${message}`);
  }

  res.status(status).json({
    error: message,
    ...(isApiError(err) && err.code ? { code: err.code } : {}),
    // In dev only, include more
    ...(process.env.NODE_ENV !== "production" && err instanceof Error ? { stack: err.stack?.split("\n").slice(0, 5) } : {}),
  });
}
