
build: components index.js index.css
	@component build --standalone site --dev --copy --prefix .

components: component.json
	@component install --dev

clean:
	rm -fr build components

.PHONY: clean test
