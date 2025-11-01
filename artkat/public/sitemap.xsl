<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #545454;
            background: #ffffff;
            margin: 0;
            padding: 20px;
          }
          table {
            border: none;
            border-collapse: collapse;
            width: 100%;
          }
          th {
            background-color: #00dc64;
            color: #ffffff;
            text-align: left;
            padding: 10px;
            font-weight: bold;
          }
          td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #00dc64;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .header {
            background-color: #121212;
            color: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>XML Sitemap</h1>
          <p>Generated for ArtKat Portfolio</p>
        </div>
        <table>
          <tr>
            <th>URL</th>
            <th>Last Modified</th>
            <th>Change Frequency</th>
            <th>Priority</th>
          </tr>
          <xsl:for-each select="urlset/url">
            <tr>
              <td>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="loc"/>
                  </xsl:attribute>
                  <xsl:value-of select="loc"/>
                </a>
              </td>
              <td><xsl:value-of select="lastmod"/></td>
              <td><xsl:value-of select="changefreq"/></td>
              <td><xsl:value-of select="priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>