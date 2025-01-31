// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file

let wasm;
export function __wbg_set_wasm(val) {
  wasm = val;
}

const lTextDecoder = typeof TextDecoder === "undefined"
  ? (0, module.require)("util").TextDecoder
  : TextDecoder;

let cachedTextDecoder = new lTextDecoder("utf-8", {
  ignoreBOM: true,
  fatal: true,
});

cachedTextDecoder.decode();

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
  if (
    cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0
  ) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(
    getUint8ArrayMemory0().subarray(ptr, ptr + len),
  );
}

function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_2.set(idx, obj);
  return idx;
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === "undefined"
  ? (0, module.require)("util").TextEncoder
  : TextEncoder;

let cachedTextEncoder = new lTextEncoder("utf-8");

const encodeString = typeof cachedTextEncoder.encodeInto === "function"
  ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  }
  : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length,
    };
  };

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8ArrayMemory0();

  let offset = 0;

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 0x7F) break;
    mem[ptr + offset] = code;
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
  if (
    cachedDataViewMemory0 === null ||
    cachedDataViewMemory0.buffer.detached === true ||
    (cachedDataViewMemory0.buffer.detached === undefined &&
      cachedDataViewMemory0.buffer !== wasm.memory.buffer)
  ) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === "undefined")
  ? { register: () => {}, unregister: () => {} }
  : new FinalizationRegistry((state) => {
    wasm.__wbindgen_export_5.get(state.dtor)(state.a, state.b);
  });

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    // First up with a closure we increment the internal reference
    // count. This ensures that the Rust closure environment won't
    // be deallocated while we're invoking it.
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_5.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val);
  }
  if (className == "Object") {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}
/**
 * @param {string} element_room_id
 * @param {string} body
 * @param {string} element_username
 * @param {string} element_password
 * @returns {Promise<boolean>}
 */
export function matrix_message(
  element_room_id,
  body,
  element_username,
  element_password,
) {
  const ptr0 = passStringToWasm0(
    element_room_id,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passStringToWasm0(
    body,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  const ptr2 = passStringToWasm0(
    element_username,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len2 = WASM_VECTOR_LEN;
  const ptr3 = passStringToWasm0(
    element_password,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len3 = WASM_VECTOR_LEN;
  const ret = wasm.matrix_message(
    ptr0,
    len0,
    ptr1,
    len1,
    ptr2,
    len2,
    ptr3,
    len3,
  );
  return ret;
}

function __wbg_adapter_28(arg0, arg1) {
  wasm
    ._dyn_core__ops__function__FnMut_____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h2fccd112d06225e5(
      arg0,
      arg1,
    );
}

function __wbg_adapter_31(arg0, arg1, arg2) {
  wasm.closure889_externref_shim(arg0, arg1, arg2);
}

function __wbg_adapter_83(arg0, arg1, arg2, arg3) {
  wasm.closure244_externref_shim(arg0, arg1, arg2, arg3);
}

/**
 * A machine-readable representation of the authenticity for a `ShieldState`.
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const ShieldStateCode = Object.freeze({
  /**
   * Not enough information available to check the authenticity.
   */
  AuthenticityNotGuaranteed: 0,
  "0": "AuthenticityNotGuaranteed",
  /**
   * The sending device isn't yet known by the Client.
   */
  UnknownDevice: 1,
  "1": "UnknownDevice",
  /**
   * The sending device hasn't been verified by the sender.
   */
  UnsignedDevice: 2,
  "2": "UnsignedDevice",
  /**
   * The sender hasn't been verified by the Client's user.
   */
  UnverifiedIdentity: 3,
  "3": "UnverifiedIdentity",
  /**
   * An unencrypted event in an encrypted room.
   */
  SentInClear: 4,
  "4": "SentInClear",
  /**
   * The sender was previously verified but changed their identity.
   */
  VerificationViolation: 5,
  "5": "VerificationViolation",
});

const __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];

const __wbindgen_enum_RequestMode = [
  "same-origin",
  "no-cors",
  "cors",
  "navigate",
];

export function __wbg_abort_775ef1d17fc65868(arg0) {
  arg0.abort();
}

export function __wbg_append_8c7dd8d641a5f01b() {
  return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
  }, arguments);
}

export function __wbg_arrayBuffer_d1b44c4390db422f() {
  return handleError(function (arg0) {
    const ret = arg0.arrayBuffer();
    return ret;
  }, arguments);
}

export function __wbg_buffer_609cc3eee51ed158(arg0) {
  const ret = arg0.buffer;
  return ret;
}

export function __wbg_call_672a4d21634d4a24() {
  return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
  }, arguments);
}

export function __wbg_call_7cccdd69e0791ae2() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
  }, arguments);
}

export function __wbg_clearTimeout_5a54f8841c30079a(arg0) {
  const ret = clearTimeout(arg0);
  return ret;
}

export function __wbg_crypto_ed58b8e10a292839(arg0) {
  const ret = arg0.crypto;
  return ret;
}

export function __wbg_done_769e5ede4b31c67b(arg0) {
  const ret = arg0.done;
  return ret;
}

export function __wbg_fetch_4465c2b10f21a927(arg0) {
  const ret = fetch(arg0);
  return ret;
}

export function __wbg_fetch_509096533071c657(arg0, arg1) {
  const ret = arg0.fetch(arg1);
  return ret;
}

export function __wbg_getRandomValues_bcb4912f16000dc4() {
  return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
  }, arguments);
}

export function __wbg_get_67b2ba62fc30de12() {
  return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
  }, arguments);
}

export function __wbg_has_a5ea9117f258a0ec() {
  return handleError(function (arg0, arg1) {
    const ret = Reflect.has(arg0, arg1);
    return ret;
  }, arguments);
}

export function __wbg_headers_9cb51cfd2ac780a4(arg0) {
  const ret = arg0.headers;
  return ret;
}

export function __wbg_instanceof_Response_f2cc20d9f7dfd644(arg0) {
  let result;
  try {
    result = arg0 instanceof Response;
  } catch (_) {
    result = false;
  }
  const ret = result;
  return ret;
}

export function __wbg_iterator_9a24c88df860dc65() {
  const ret = Symbol.iterator;
  return ret;
}

export function __wbg_length_a446193dc22c12f8(arg0) {
  const ret = arg0.length;
  return ret;
}

export function __wbg_log_e6ec4aca1958ad00(arg0, arg1) {
  console.log(getStringFromWasm0(arg0, arg1));
}

export function __wbg_msCrypto_0a36e2ec3a343d26(arg0) {
  const ret = arg0.msCrypto;
  return ret;
}

export function __wbg_new_018dcc2d6c8c2f6a() {
  return handleError(function () {
    const ret = new Headers();
    return ret;
  }, arguments);
}

export function __wbg_new_23a2665fac83c611(arg0, arg1) {
  try {
    var state0 = { a: arg0, b: arg1 };
    var cb0 = (arg0, arg1) => {
      const a = state0.a;
      state0.a = 0;
      try {
        return __wbg_adapter_83(a, state0.b, arg0, arg1);
      } finally {
        state0.a = a;
      }
    };
    const ret = new Promise(cb0);
    return ret;
  } finally {
    state0.a = state0.b = 0;
  }
}

export function __wbg_new_405e22f390576ce2() {
  const ret = new Object();
  return ret;
}

export function __wbg_new_a12002a7f91c75be(arg0) {
  const ret = new Uint8Array(arg0);
  return ret;
}

export function __wbg_new_e25e5aab09ff45db() {
  return handleError(function () {
    const ret = new AbortController();
    return ret;
  }, arguments);
}

export function __wbg_newnoargs_105ed471475aaf50(arg0, arg1) {
  const ret = new Function(getStringFromWasm0(arg0, arg1));
  return ret;
}

export function __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a(
  arg0,
  arg1,
  arg2,
) {
  const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
  return ret;
}

export function __wbg_newwithlength_a381634e90c276d4(arg0) {
  const ret = new Uint8Array(arg0 >>> 0);
  return ret;
}

export function __wbg_newwithstrandinit_06c535e0a867c635() {
  return handleError(function (arg0, arg1, arg2) {
    const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
    return ret;
  }, arguments);
}

export function __wbg_next_25feadfc0913fea9(arg0) {
  const ret = arg0.next;
  return ret;
}

export function __wbg_next_6574e1a8a62d1055() {
  return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
  }, arguments);
}

export function __wbg_node_02999533c4ea02e3(arg0) {
  const ret = arg0.node;
  return ret;
}

export function __wbg_now_2c95c9de01293173(arg0) {
  const ret = arg0.now();
  return ret;
}

export function __wbg_now_807e54c39636c349() {
  const ret = Date.now();
  return ret;
}

export function __wbg_performance_7a3ffd0b17f663ad(arg0) {
  const ret = arg0.performance;
  return ret;
}

export function __wbg_process_5c1d670bc53614b8(arg0) {
  const ret = arg0.process;
  return ret;
}

export function __wbg_queueMicrotask_97d92b4fcc8a61c5(arg0) {
  queueMicrotask(arg0);
}

export function __wbg_queueMicrotask_d3219def82552485(arg0) {
  const ret = arg0.queueMicrotask;
  return ret;
}

export function __wbg_randomFillSync_ab2cfe79ebbf2740() {
  return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
  }, arguments);
}

export function __wbg_require_79b1e9274cde3c87() {
  return handleError(function () {
    const ret = module.require;
    return ret;
  }, arguments);
}

export function __wbg_resolve_4851785c9c5f573d(arg0) {
  const ret = Promise.resolve(arg0);
  return ret;
}

export function __wbg_setTimeout_db2dbaeefb6f39c7() {
  return handleError(function (arg0, arg1) {
    const ret = setTimeout(arg0, arg1);
    return ret;
  }, arguments);
}

export function __wbg_set_65595bdd868b3009(arg0, arg1, arg2) {
  arg0.set(arg1, arg2 >>> 0);
}

export function __wbg_setbody_5923b78a95eedf29(arg0, arg1) {
  arg0.body = arg1;
}

export function __wbg_setcredentials_c3a22f1cd105a2c6(arg0, arg1) {
  arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
}

export function __wbg_setheaders_834c0bdb6a8949ad(arg0, arg1) {
  arg0.headers = arg1;
}

export function __wbg_setmethod_3c5280fe5d890842(arg0, arg1, arg2) {
  arg0.method = getStringFromWasm0(arg1, arg2);
}

export function __wbg_setmode_5dc300b865044b65(arg0, arg1) {
  arg0.mode = __wbindgen_enum_RequestMode[arg1];
}

export function __wbg_setsignal_75b21ef3a81de905(arg0, arg1) {
  arg0.signal = arg1;
}

export function __wbg_signal_aaf9ad74119f20a4(arg0) {
  const ret = arg0.signal;
  return ret;
}

export function __wbg_static_accessor_GLOBAL_88a902d13a557d07() {
  const ret = typeof global === "undefined" ? null : global;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0() {
  const ret = typeof globalThis === "undefined" ? null : globalThis;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_static_accessor_SELF_37c5d418e4bf5819() {
  const ret = typeof self === "undefined" ? null : self;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_static_accessor_WINDOW_5de37043a91a9c40() {
  const ret = typeof window === "undefined" ? null : window;
  return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}

export function __wbg_status_f6360336ca686bf0(arg0) {
  const ret = arg0.status;
  return ret;
}

export function __wbg_stringify_f7ed6987935b4a24() {
  return handleError(function (arg0) {
    const ret = JSON.stringify(arg0);
    return ret;
  }, arguments);
}

export function __wbg_subarray_aa9065fa9dc5df96(arg0, arg1, arg2) {
  const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
  return ret;
}

export function __wbg_then_44b73946d2fb3e7d(arg0, arg1) {
  const ret = arg0.then(arg1);
  return ret;
}

export function __wbg_then_48b406749878a531(arg0, arg1, arg2) {
  const ret = arg0.then(arg1, arg2);
  return ret;
}

export function __wbg_url_ae10c34ca209681d(arg0, arg1) {
  const ret = arg1.url;
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbg_value_cd1ffa7b1ab794f1(arg0) {
  const ret = arg0.value;
  return ret;
}

export function __wbg_versions_c71aa1626a93e0a1(arg0) {
  const ret = arg0.versions;
  return ret;
}

export function __wbindgen_cb_drop(arg0) {
  const obj = arg0.original;
  if (obj.cnt-- == 1) {
    obj.a = 0;
    return true;
  }
  const ret = false;
  return ret;
}

export function __wbindgen_closure_wrapper13020(arg0, arg1, arg2) {
  const ret = makeMutClosure(arg0, arg1, 233, __wbg_adapter_31);
  return ret;
}

export function __wbindgen_closure_wrapper6622(arg0, arg1, arg2) {
  const ret = makeMutClosure(arg0, arg1, 233, __wbg_adapter_28);
  return ret;
}

export function __wbindgen_debug_string(arg0, arg1) {
  const ret = debugString(arg1);
  const ptr1 = passStringToWasm0(
    ret,
    wasm.__wbindgen_malloc,
    wasm.__wbindgen_realloc,
  );
  const len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_2;
  const offset = table.grow(4);
  table.set(0, undefined);
  table.set(offset + 0, undefined);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
}

export function __wbindgen_is_function(arg0) {
  const ret = typeof arg0 === "function";
  return ret;
}

export function __wbindgen_is_object(arg0) {
  const val = arg0;
  const ret = typeof val === "object" && val !== null;
  return ret;
}

export function __wbindgen_is_string(arg0) {
  const ret = typeof arg0 === "string";
  return ret;
}

export function __wbindgen_is_undefined(arg0) {
  const ret = arg0 === undefined;
  return ret;
}

export function __wbindgen_memory() {
  const ret = wasm.memory;
  return ret;
}

export function __wbindgen_string_get(arg0, arg1) {
  const obj = arg1;
  const ret = typeof obj === "string" ? obj : undefined;
  var ptr1 = isLikeNone(ret)
    ? 0
    : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
  var len1 = WASM_VECTOR_LEN;
  getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
  getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}

export function __wbindgen_string_new(arg0, arg1) {
  const ret = getStringFromWasm0(arg0, arg1);
  return ret;
}

export function __wbindgen_throw(arg0, arg1) {
  throw new Error(getStringFromWasm0(arg0, arg1));
}
