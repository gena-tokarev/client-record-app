module.exports = function (options) {
  return {
    ...options,
    module: {
      ...options.module,
      rules: [
        // ...options.module.rules,
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
          },
          include: [
            /@client-record\/shared\/dto\/user-sign-up.request.dto/,
            /node_modules\/@client-record\/shared\/dto\/user-sign-up.request.dto/,
            /apps/,
            /libs/,
          ],
        },
      ],
    },
  };
};
