import isNil from 'lodash/isNil';
import isError from 'lodash/isError';
import isEmpty from 'lodash/isEmpty';

export function handleError(error) {
    if (isNil(error) || !isError(error)) return;

    if (error.hasOwnProperty("response") && !!error.response && error.response.hasOwnProperty("status")) {
        const { response: { data, status } } = error;
        if (data && status !== 400) {
            const { message = '' } = data;
            if (!!message) return console.error(error);
            const { errors = {} } = data;
            if (!isEmpty(errors)) {
                //let displayingMessage = "";
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        Array.isArray(errors[key]) && errors[key].forEach(function (error) {
                            //displayingMessage = displayingMessage + error + "\n";
                            console.error(error);
                        });
                    }
                }
                return;
            }
        }
    }

    if (error.hasOwnProperty("message")) {
        return console.error(error.message);
    }
}