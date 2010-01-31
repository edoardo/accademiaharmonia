#!/usr/bin/perl
#
# feeder.pl
# parse the RSS site feed and generate an XHTML page for the events
#

use strict;

use lib 'lib';

use Data::Dumper;
use HTML::Entities;
use HTML::Template;

use feed;

my $cLanguage = $ARGV[0] || 'it';

# Parse RSS file
my $rRss = feed::parse( "rss/$cLanguage/harmonia.rss" );

my @aLoop;

my $rItems = feed::getItems( $rRss );

foreach my $rItem ( @$rItems )
{
    warn 'entrato! ' . ref( $rItem );
    my $cDate = substr( $rItem->{'link'}, -8 );
    push @aLoop, { anchor => $cDate,
                   date => feed::formatDate( $cDate, $cLanguage ),
                   title => encode_entities( substr( $rItem->{'title'}, 13 ) ), # remove date
                   description => encode_entities( $rItem->{'description'} ) };
}
print 'loop: ' . scalar( @aLoop );
# Defaults
my $cTmplPath = 'tmpl/'.$cLanguage;
my $cTemplate = 'events_loop.tmpl';

my $oTmpl = HTML::Template->new( filename => $cTemplate, path => [ $cTmplPath ], debug => 1 );#, search_path_on_include => 0 );

if( open( TMPL, "> $cTmplPath/events.tmpl" ) )
{
    $oTmpl->param( events => \@aLoop );
    print TMPL $oTmpl->output();
    close TMPL;
}
else
{
    print "Troubles!";
}
