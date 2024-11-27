import * as Yup from "yup";
import { get, uniq } from "underscore";

const DEFAULT_DUPLICATED_MESSAGE = "duuplicateee";

Yup.addMethod<Yup.ArraySchema<[]>>(
  Yup.array,
  "unique",
  function (path: string, message?: string) {
    const defaultMessage = `${
      path.charAt(0).toUpperCase() + path.slice(1)
    } ${DEFAULT_DUPLICATED_MESSAGE}`;

    return this.test("unique", (message = defaultMessage), function (list) {
      const mapper = (x: unknown) => get(x, path);
      const set = uniq(list.map(mapper));
      const isUnique = set.length === list.length;

      if (isUnique) {
        return true;
      }

      const idx = list.findIndex(
        (l: unknown, i: number) => mapper(l) !== set[i]
      );

      return this.createError({
        path: `${this.path}[${idx}].${path}`,
        message,
      });
    });
  }
);
