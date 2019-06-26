import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const DateType = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
        return new Date(Date.parse(value));
    },
    serialize(value) {
        return value.toISOString ? value.toISOString() : value;
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            const time = Date.parse(ast.value);

            return new Date(time);
        }
        return null;
    },
});

export default DateType;