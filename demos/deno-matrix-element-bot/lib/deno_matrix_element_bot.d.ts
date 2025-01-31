// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file

export function matrix_message(
  element_room_id: string,
  body: string,
  element_username: string,
  element_password: string,
): Promise<boolean>;
/**
 * A machine-readable representation of the authenticity for a `ShieldState`.
 */
export enum ShieldStateCode {
  /**
   * Not enough information available to check the authenticity.
   */
  AuthenticityNotGuaranteed = 0,
  /**
   * The sending device isn't yet known by the Client.
   */
  UnknownDevice = 1,
  /**
   * The sending device hasn't been verified by the sender.
   */
  UnsignedDevice = 2,
  /**
   * The sender hasn't been verified by the Client's user.
   */
  UnverifiedIdentity = 3,
  /**
   * An unencrypted event in an encrypted room.
   */
  SentInClear = 4,
  /**
   * The sender was previously verified but changed their identity.
   */
  VerificationViolation = 5,
}
