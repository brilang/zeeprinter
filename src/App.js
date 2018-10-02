import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import QRCode from "qrcode";
import uuidv4 from "uuid/v4";
import jsPDF from "jspdf";

import MainMenu from "./components/MainMenu/MainMenu";
import UrlForm from "./components/UrlForm/UrlForm";
import Footer from "./components/Footer/Footer";
import t from "./templates/template8163";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codes: "",
      qrcodes: []
    };
  }

  onGeneratePDF(newcodes) {
    const inputcodes = newcodes
      .replace(/\r\n/g, "\n")
      .replace(/(?:(?:\r\n|\r|\n)\s*){2}/gm, "")
      .split("\n")
      .filter((code) => {
        return code.length > 1;
      });
    if (inputcodes.length) {
      let username = inputcodes[0].split("/").slice(1)[3];
      const qrcodes = [];
      inputcodes.map(function(code) {
        QRCode.toDataURL(code, { width: 90 }, function(err, url) {
          qrcodes.push({ code: code, url: url });
        });
        return null;
      });
      if (qrcodes.length) {
        const doc = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "letter"
        });
        // doc.addImage(t.background, "PNG", 0, 0, 216, 279);
        let x = t.pageleftmargin + t.horizontalgutterlabelleft;
        let y = t.pagetopmargin + t.verticalgutterlabeltop;
        let w = t.w;
        let h = t.h;
        let labelcolumncount = 0;
        let pagecolumncount = 0;
        let labelrowcount = 0;
        let pagerowcount = 0;
        let maxlabelcolumncount = t.columnsperlabel;
        let maxpagecolumncount = t.columnsperlabel * t.columnsperpage;
        let maxlabelrowcount = t.rowsperlabel;
        let maxpagerowcount = t.rowsperpage * t.rowsperlabel;

        for (let i = 0; i < qrcodes.length; i++) {
          // Add code image to pdf
          doc.addImage(qrcodes[i].url, "JPEG", x, y, w, h);
          // move width + gutter to the right
          x += w + t.horizontalgutterbetweencodes;
          // increment column counts
          labelcolumncount++;
          pagecolumncount++;
          if (labelcolumncount === maxlabelcolumncount) {
            // move to next horizontal label
            x +=
              t.horizontalgutterlabelright +
              t.horizontalgutterbetweenlabels +
              t.horizontalgutterlabelleft;
            // reset label column count
            labelcolumncount = 0;
          }
          if (pagecolumncount === maxpagecolumncount) {
            // reset page column count
            pagecolumncount = 0;
            // increment row counts
            labelrowcount++;
            pagerowcount++;
            // move to start of next row
            x = t.pageleftmargin + t.horizontalgutterlabelleft;
            if (labelrowcount === maxlabelrowcount) {
              // move height + gutter between labels down
              y +=
                h +
                t.verticalgutterlabelbottom +
                t.verticalgutterbetweenlabels +
                t.verticalgutterlabeltop;
              labelrowcount = 0;
            } else if (labelrowcount < maxlabelrowcount) {
              // move height + interior gutter down
              y += h + t.verticalgutterbetweencodes;
            }
          }
          if (pagerowcount === maxpagerowcount) {
            if (i !== qrcodes.length - 1) {
              doc.addPage();
            }
            x = t.pageleftmargin + t.horizontalgutterlabelleft;
            y = t.pagetopmargin + t.verticalgutterlabeltop;
            w = t.w;
            h = t.h;
            labelcolumncount = 0;
            pagecolumncount = 0;
            labelrowcount = 0;
            pagerowcount = 0;
          }
        }
        // console.log(doc.output("datauristring"));
        // console.log(doc);

        doc.save(username + "-munzees-" + uuidv4() + ".pdf");
      }
      this.setState({ codes: newcodes, qrcodes: qrcodes });
    }
  }

  onClearForm() {
    this.setState({ codes: "", qrcodes: [] });
  }

  render() {
    return (
      <div className="App">
        <Container>
          <MainMenu />
          <Row className="mt-4">
            <Col lg="6">
              <h3>Create your own Munzee stickers</h3>
              <hr />
              <UrlForm
                generatePDF={this.onGeneratePDF.bind(this)}
                clearForm={this.onClearForm.bind(this)}
              />
            </Col>
            <Col lg="6">
              <p>
                Showing {this.state.qrcodes.length > 42 ? "First 42" : this.state.qrcodes.length}{" "}
                Munzees{" "}
              </p>
              <div id="qrcodes">
                {this.state.qrcodes.length
                  ? this.state.qrcodes.slice(0, 42).map(function(src) {
                      return (
                        <img
                          key={uuidv4()}
                          src={src.url}
                          alt={src.code}
                          title={src.code}
                          style={{ width: "75px", height: "auto" }}
                        />
                      );
                    })
                  : null}
              </div>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default App;
