import { PlainObject } from "../types/types";
import isArrayOrObject from "./isArrayOrObject";

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
      return false;
    }
    /* eslint-disable-next-line */
    for (const [key, value] of Object.entries(lhs)) {
      const rightValue = rhs[key];
      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        if (isEqual(value, rightValue)) {
          continue;
        }
        return false;
      }
  
      if (value !== rightValue) {
        return false;
      }
    }
  
    return true;
  }