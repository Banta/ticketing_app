class TicketsReportPdf < Prawn::Document
  def initialize(tickets)
    super()
    @tickets = tickets
    header
    table_content
  end

  def header
    text 'Report of tickets closed in the last 30 days', size: 26, style: :bold
  end

  def table_content
    # This makes a call to product_rows and gets back an array of data that will populate the columns and rows of a table
    # I then included some styling to include a header and make its text bold. I made the row background colors alternate between grey and white
    # Then I set the table column widths
    table tickets_rows do
      row(0).font_style = :bold
      # self.width = 1120
      self.header = true
      self.row_colors = ['DDDDDD', 'FFFFFF']
      # self.column_widths = [20, 70, 200, 100]
    end
  end

  def tickets_rows
    [['#', 'Title', 'Description', 'Closed at']] +
        @tickets.map do |ticket|
          [ticket.id, ticket.title, ticket.desc, ticket.closed_time]
        end
  end
end