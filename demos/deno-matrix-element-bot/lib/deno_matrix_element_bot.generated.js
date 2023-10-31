// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 82819a98ea2e9f9a960ac422195b11456916cd7b
let wasm;

const cachedTextDecoder = typeof TextDecoder !== "undefined"
  ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
  : {
    decode: () => {
      throw Error("TextDecoder not available");
    },
  };

if (typeof TextDecoder !== "undefined") cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

function getObject(idx) {
  return heap[idx];
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = typeof TextEncoder !== "undefined"
  ? new TextEncoder("utf-8")
  : {
    encode: () => {
      throw Error("TextEncoder not available");
    },
  };

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr = malloc(buf.length, 1) >>> 0;
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;

  const mem = getUint8Memory0();

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
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);

    offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
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
  if (builtInMatches.length > 1) {
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

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

const CLOSURE_DTORS = new FinalizationRegistry((state) => {
  wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
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
        wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
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
function __wbg_adapter_26(arg0, arg1, arg2) {
  wasm.wasm_bindgen__convert__closures__invoke1_mut__hc951d71fbeab06dc(
    arg0,
    arg1,
    addHeapObject(arg2),
  );
}

function __wbg_adapter_29(arg0, arg1) {
  wasm.wasm_bindgen__convert__closures__invoke0_mut__he5b7f9f80d6c027f(
    arg0,
    arg1,
  );
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
  return takeObject(ret);
}

function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}

function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_93(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen__convert__closures__invoke2_mut__h67e823a34b740eb0(
    arg0,
    arg1,
    addHeapObject(arg2),
    addHeapObject(arg3),
  );
}

const imports = {
  __wbindgen_placeholder__: {
    __wbg_abort_654b796176d117aa: function (arg0) {
      getObject(arg0).abort();
    },
    __wbg_new_b51585de1b234aff: function () {
      const ret = new Object();
      return addHeapObject(ret);
    },
    __wbindgen_string_new: function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return addHeapObject(ret);
    },
    __wbg_new_1eead62f64ca15ce: function () {
      return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_object_clone_ref: function (arg0) {
      const ret = getObject(arg0);
      return addHeapObject(ret);
    },
    __wbindgen_memory: function () {
      const ret = wasm.memory;
      return addHeapObject(ret);
    },
    __wbg_buffer_085ec1f694018c4f: function (arg0) {
      const ret = getObject(arg0).buffer;
      return addHeapObject(ret);
    },
    __wbg_newwithbyteoffsetandlength_6da8e527659b86aa: function (
      arg0,
      arg1,
      arg2,
    ) {
      const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_new_8125e318e6245eed: function (arg0) {
      const ret = new Uint8Array(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_append_fda9e3432e3e88da: function () {
      return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(
          getStringFromWasm0(arg1, arg2),
          getStringFromWasm0(arg3, arg4),
        );
      }, arguments);
    },
    __wbg_new_55c9955722952374: function () {
      return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_signal_4bd18fb489af2d4c: function (arg0) {
      const ret = getObject(arg0).signal;
      return addHeapObject(ret);
    },
    __wbg_newwithstrandinit_cad5cd6038c7ff5d: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(
          getStringFromWasm0(arg0, arg1),
          getObject(arg2),
        );
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_has_c5fcd020291e56b8: function () {
      return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
      }, arguments);
    },
    __wbg_fetch_8eaf01857a5bb21f: function (arg0, arg1) {
      const ret = getObject(arg0).fetch(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_fetch_b5d6bebed1e6c2d2: function (arg0) {
      const ret = fetch(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_instanceof_Response_fc4327dbfcdf5ced: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Response;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_status_ac85a3142a84caa2: function (arg0) {
      const ret = getObject(arg0).status;
      return ret;
    },
    __wbg_url_8503de97f69da463: function (arg0, arg1) {
      const ret = getObject(arg1).url;
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len1 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len1;
      getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    },
    __wbg_headers_b70de86b8e989bc0: function (arg0) {
      const ret = getObject(arg0).headers;
      return addHeapObject(ret);
    },
    __wbg_iterator_97f0c81209c6c35a: function () {
      const ret = Symbol.iterator;
      return addHeapObject(ret);
    },
    __wbg_get_97b561fb56f034b5: function () {
      return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_is_object: function (arg0) {
      const val = getObject(arg0);
      const ret = typeof val === "object" && val !== null;
      return ret;
    },
    __wbg_next_526fc47e980da008: function (arg0) {
      const ret = getObject(arg0).next;
      return addHeapObject(ret);
    },
    __wbg_next_ddb3312ca1c4e32a: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_done_5c1f01fb660d73b5: function (arg0) {
      const ret = getObject(arg0).done;
      return ret;
    },
    __wbg_value_1695675138684bd5: function (arg0) {
      const ret = getObject(arg0).value;
      return addHeapObject(ret);
    },
    __wbg_stringify_e25465938f3f611f: function () {
      return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_string_get: function (arg0, arg1) {
      const obj = getObject(arg1);
      const ret = typeof obj === "string" ? obj : undefined;
      var ptr1 = isLikeNone(ret)
        ? 0
        : passStringToWasm0(
          ret,
          wasm.__wbindgen_malloc,
          wasm.__wbindgen_realloc,
        );
      var len1 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len1;
      getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    },
    __wbg_arrayBuffer_288fb3538806e85c: function () {
      return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_length_72e2208bbc0efc61: function (arg0) {
      const ret = getObject(arg0).length;
      return ret;
    },
    __wbg_new_43f1b47c28813cbd: function (arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg0, arg1) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return __wbg_adapter_93(a, state0.b, arg0, arg1);
          } finally {
            state0.a = a;
          }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
      } finally {
        state0.a = state0.b = 0;
      }
    },
    __wbg_now_9c5990bda04c7e53: function () {
      const ret = Date.now();
      return ret;
    },
    __wbindgen_is_undefined: function (arg0) {
      const ret = getObject(arg0) === undefined;
      return ret;
    },
    __wbg_static_accessor_MODULE_ef3aa2eb251158a5: function () {
      const ret = module;
      return addHeapObject(ret);
    },
    __wbg_crypto_c48a774b022d20ac: function (arg0) {
      const ret = getObject(arg0).crypto;
      return addHeapObject(ret);
    },
    __wbg_process_298734cf255a885d: function (arg0) {
      const ret = getObject(arg0).process;
      return addHeapObject(ret);
    },
    __wbg_versions_e2e78e134e3e5d01: function (arg0) {
      const ret = getObject(arg0).versions;
      return addHeapObject(ret);
    },
    __wbg_node_1cd7a5d853dbea79: function (arg0) {
      const ret = getObject(arg0).node;
      return addHeapObject(ret);
    },
    __wbindgen_is_string: function (arg0) {
      const ret = typeof (getObject(arg0)) === "string";
      return ret;
    },
    __wbg_msCrypto_bcb970640f50a1e8: function (arg0) {
      const ret = getObject(arg0).msCrypto;
      return addHeapObject(ret);
    },
    __wbg_require_8f08ceecec0f4fee: function () {
      return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbindgen_is_function: function (arg0) {
      const ret = typeof (getObject(arg0)) === "function";
      return ret;
    },
    __wbg_call_cb65541d95d71282: function () {
      return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_self_1ff1d729e9aae938: function () {
      return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_window_5f4faef6c12b79ec: function () {
      return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_globalThis_1d39714405582d3c: function () {
      return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_global_651f05c6a0944d1c: function () {
      return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_newnoargs_581967eacc0e2604: function (arg0, arg1) {
      const ret = new Function(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    },
    __wbg_call_01734de55d61e11d: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_set_092e06b0f9d71865: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(
          getObject(arg0),
          getObject(arg1),
          getObject(arg2),
        );
        return ret;
      }, arguments);
    },
    __wbg_set_5cf90238115182c3: function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    },
    __wbg_newwithlength_e5d69174d6984cd7: function (arg0) {
      const ret = new Uint8Array(arg0 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_subarray_13db269f57aa838d: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
      return addHeapObject(ret);
    },
    __wbg_self_7eede1f4488bf346: function () {
      return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
      }, arguments);
    },
    __wbg_crypto_c909fb428dcbddb6: function (arg0) {
      const ret = getObject(arg0).crypto;
      return addHeapObject(ret);
    },
    __wbg_msCrypto_511eefefbfc70ae4: function (arg0) {
      const ret = getObject(arg0).msCrypto;
      return addHeapObject(ret);
    },
    __wbg_getRandomValues_307049345d0bd88c: function (arg0) {
      const ret = getObject(arg0).getRandomValues;
      return addHeapObject(ret);
    },
    __wbg_require_900d5c3984fe7703: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).require(getStringFromWasm0(arg1, arg2));
      return addHeapObject(ret);
    },
    __wbg_randomFillSync_85b3f4c52c56c313: function (arg0, arg1, arg2) {
      getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
    },
    __wbg_getRandomValues_cd175915511f705e: function (arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    },
    __wbg_randomFillSync_dc1e9a60c158336d: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
      }, arguments);
    },
    __wbg_getRandomValues_37fa2ca9e4e07fab: function () {
      return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
      }, arguments);
    },
    __wbindgen_debug_string: function (arg0, arg1) {
      const ret = debugString(getObject(arg1));
      const ptr1 = passStringToWasm0(
        ret,
        wasm.__wbindgen_malloc,
        wasm.__wbindgen_realloc,
      );
      const len1 = WASM_VECTOR_LEN;
      getInt32Memory0()[arg0 / 4 + 1] = len1;
      getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    },
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbindgen_cb_drop: function (arg0) {
      const obj = takeObject(arg0).original;
      if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
      }
      const ret = false;
      return ret;
    },
    __wbg_then_f7e06ee3c11698eb: function (arg0, arg1) {
      const ret = getObject(arg0).then(getObject(arg1));
      return addHeapObject(ret);
    },
    __wbg_then_b2267541e2a73865: function (arg0, arg1, arg2) {
      const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    },
    __wbg_resolve_53698b95aaf7fcf8: function (arg0) {
      const ret = Promise.resolve(getObject(arg0));
      return addHeapObject(ret);
    },
    __wbg_setTimeout_eb1a0d116c26d9f6: function () {
      return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
        return ret;
      }, arguments);
    },
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0);
    },
    __wbg_performance_2c295061c8b01e0b: function (arg0) {
      const ret = getObject(arg0).performance;
      return isLikeNone(ret) ? 0 : addHeapObject(ret);
    },
    __wbg_now_0cfdc90c97d0c24b: function (arg0) {
      const ret = getObject(arg0).now();
      return ret;
    },
    __wbg_instanceof_Window_9029196b662bc42a: function (arg0) {
      let result;
      try {
        result = getObject(arg0) instanceof Window;
      } catch {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbindgen_closure_wrapper8599: function (arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 260, __wbg_adapter_26);
      return addHeapObject(ret);
    },
    __wbindgen_closure_wrapper8651: function (arg0, arg1, arg2) {
      const ret = makeMutClosure(arg0, arg1, 260, __wbg_adapter_29);
      return addHeapObject(ret);
    },
  },
};

import { Loader } from "https://deno.land/x/wasmbuild@0.15.1/loader.ts";
import { cacheToLocalDir } from "https://deno.land/x/wasmbuild@0.15.1/cache.ts";

const loader = new Loader({
  imports,
  cache: cacheToLocalDir,
});
/**
 * Decompression callback
 *
 * @callback DecompressCallback
 * @param {Uint8Array} compressed
 * @return {Uint8Array} decompressed
 */

/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports;
}

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { matrix_message: typeof matrix_message }
 * }>}
 */
export async function instantiateWithInstance(opts) {
  const { instance } = await loader.load(
    opts?.url ?? new URL("deno_matrix_element_bot_bg.wasm", import.meta.url),
    opts?.decompress,
  );
  wasm = wasm ?? instance.exports;
  cachedInt32Memory0 = cachedInt32Memory0 ?? new Int32Array(wasm.memory.buffer);
  cachedUint8Memory0 = cachedUint8Memory0 ?? new Uint8Array(wasm.memory.buffer);
  return {
    instance,
    exports: getWasmInstanceExports(),
  };
}

function getWasmInstanceExports() {
  return { matrix_message };
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return loader.instance != null;
}
