FROM golang:1.14 as development
WORKDIR /root
RUN GO111MODULE=on go get github.com/cortesi/modd/cmd/modd
COPY . .
CMD modd

FROM golang:1.14 as build
WORKDIR /root
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -o app .

FROM gcr.io/distroless/static as production
COPY --from=build /root/app /app
CMD ["/app"]