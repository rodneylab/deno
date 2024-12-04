// deno-lint-ignore-file
// deno-fmt-ignore-file

export interface InstantiateResult {
  instance: WebAssembly.Instance;
  exports: {
    matrix_message: typeof matrix_message
  };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated(): boolean;

/** Options for instantiating a Wasm instance. */
export interface InstantiateOptions {
  /** Optional url to the Wasm file to instantiate. */
  url?: URL;
  /** Callback to decompress the raw Wasm file bytes before instantiating. */
  decompress?: (bytes: Uint8Array) => Uint8Array;
}

/** Instantiates an instance of the Wasm module returning its functions.
* @remarks It is safe to call this multiple times and once successfully
* loaded it will always return a reference to the same object. */
export function instantiate(opts?: InstantiateOptions): Promise<InstantiateResult["exports"]>;

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object. */
export function instantiateWithInstance(opts?: InstantiateOptions): Promise<InstantiateResult>;

/**
* @param {string} element_room_id
* @param {string} body
* @param {string} element_username
* @param {string} element_password
* @returns {Promise<boolean>}
*/
export function matrix_message(element_room_id: string, body: string, element_username: string, element_password: string): Promise<boolean>;
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
