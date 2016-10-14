fabmo-quick-launch-app.fma: clean *.html js/*.js css/*.css fonts/*.woff fonts/*.svg fonts/*.ttf icon.png package.json
	zip fabmo-fireup-app.fma *.html js/*.js css/*.css fonts/*.svg fonts/*.ttf fonts/*.woff icon.png package.json

.PHONY: clean

clean:
	rm -rf fabmo-quick-launch-app.fma
